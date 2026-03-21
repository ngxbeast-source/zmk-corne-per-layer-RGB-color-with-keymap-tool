$filePath = "e:\Github\NGX_Corne\RGB_Code_Helper.html"
$lines = [System.IO.File]::ReadAllLines($filePath)
Write-Host "Read $($lines.Count) lines"

# ============================================================
# Fix 1: Combo add handler - line 5404 (0-indexed 5403)
# Remove trailing comma and orphaned lines after renderComboMiniKb();
# ============================================================
# Check if combo add handler still has junk
if ($lines[5403] -match 'renderComboMiniKb\(\);\s*,') {
    $lines[5403] = '    renderComboMiniKb();'
    # Remove junk lines 5404 and 5405 (0-indexed)
    $linesList = [System.Collections.Generic.List[string]]::new($lines)
    $linesList.RemoveAt(5404)
    $linesList.RemoveAt(5404) # was 5405, now shifted
    $lines = $linesList.ToArray()
    Write-Host "Fixed combo add handler. Now $($lines.Count) lines"
} else {
    Write-Host "Combo add handler appears clean, skipping"
}

# ============================================================
# Fix 2: Combo edit handler - lines around 5452-5464 (0-indexed)
# Check if it's corrupted (look for "ifdocument" pattern)
# ============================================================
$comboEditCorrupt = $false
for ($i = 5450; $i -lt 5470; $i++) {
    if ($i -lt $lines.Count -and $lines[$i] -match 'ifdocument') {
        $comboEditCorrupt = $true
        break
    }
}
if ($comboEditCorrupt) {
    # Find the exact line range
    $startIdx = -1
    $endIdx = -1
    for ($i = 5440; $i -lt 5480; $i++) {
        if ($lines[$i] -match 'combo\.slowRelease.*=.*slow') { $startIdx = $i; break }
    }
    if ($startIdx -eq -1) {
        for ($i = 5440; $i -lt 5480; $i++) {
            if ($lines[$i] -match 'ifdocument') { $startIdx = $i; break }
        }
    }
    if ($startIdx -ge 0) {
        # Find closing of edit handler block
        for ($i = $startIdx; $i -lt ($startIdx + 25); $i++) {
            if ($lines[$i] -match "style\.display\s*=\s*''") { $endIdx = $i; break }
        }
        if ($endIdx -ge 0) {
            $replacementLines = @(
                "      combo.slowRelease = document.getElementById('comboSlowRelease').checked;"
                "      combo.requirePriorIdle = document.getElementById('comboRequirePriorIdle').value || '';"
                "      keymapCombos[editingComboIndex] = combo;"
                "      renderComboMiniKb();"
                "      document.getElementById('comboEditor').style.display = 'none';"
            )
            $linesList = [System.Collections.Generic.List[string]]::new($lines)
            $removeCount = $endIdx - $startIdx + 1
            for ($r = 0; $r -lt $removeCount; $r++) { $linesList.RemoveAt($startIdx) }
            for ($r = $replacementLines.Count - 1; $r -ge 0; $r--) { $linesList.Insert($startIdx, $replacementLines[$r]) }
            $lines = $linesList.ToArray()
            Write-Host "Fixed combo edit handler. Removed $removeCount, added $($replacementLines.Count). Now $($lines.Count) lines"
        }
    }
} else {
    Write-Host "Combo edit handler appears clean, skipping"
}

# ============================================================
# Fix 3: Behavior cancel/save handler (largest corruption)
# The cancel handler at line ~5628 (0-indexed) ends with "  };,"  
# Then orphaned hold-tap props, then duplicate save handler with wrong config
# We need to replace from the corrupt "};," through the end of the save handler's "}" closing
# ============================================================

# Find the cancel handler's corrupt ending
$cancelCorruptIdx = -1
for ($i = 5620; $i -lt 5640; $i++) {
    if ($i -lt $lines.Count -and $lines[$i].Trim() -eq '};,') {
        $cancelCorruptIdx = $i
        break
    }
}

if ($cancelCorruptIdx -ge 0) {
    Write-Host "Found cancel handler corruption at line $($cancelCorruptIdx + 1)"
    
    # Find where "var beh = {" starts (that's the end of config blocks, and continues after)
    $behVarIdx = -1
    for ($i = $cancelCorruptIdx; $i -lt ($cancelCorruptIdx + 80); $i++) {
        if ($i -lt $lines.Count -and $lines[$i] -match 'var beh = \{') {
            $behVarIdx = $i
            break
        }
    }
    
    if ($behVarIdx -ge 0) {
        Write-Host "Found 'var beh' at line $($behVarIdx + 1)"
        
        # The section from cancelCorruptIdx through (behVarIdx - 1) contains the corrupt save handler start + config blocks
        # Replace it with clean version
        $saveHandlerStart = @(
            '  };'
            '  document.getElementById(''kmBehaviorSaveBtn'').onclick = function() {'
            '    pushUndo();'
            '    var type = document.getElementById(''kmBehaviorType'').value;'
            '    var config = {};'
            '    if (type === ''hold-tap'') {'
            '      config = {'
            '        tappingTerm: document.getElementById(''kmBehTappingTerm'').value || ''200'','
            '        flavor: document.getElementById(''kmBehFlavor'').value,'
            '        holdBinding: document.getElementById(''kmBehHoldBinding'').value,'
            '        tapBinding: document.getElementById(''kmBehTapBinding'').value,'
            "        quickTap: document.getElementById('kmBehQuickTap').value || '',"
            "        requirePriorIdle: document.getElementById('kmBehRequirePriorIdle').value || '',"
            "        holdTriggerPositions: document.getElementById('kmBehHoldTriggerPositions').value || '',"
            "        retroTap: document.getElementById('kmBehRetroTap').checked,"
            "        holdWhileUndecided: document.getElementById('kmBehHoldWhileUndecided').checked,"
            "        holdWhileUndecidedLinger: document.getElementById('kmBehHoldWhileUndecidedLinger').checked,"
            "        holdTriggerOnRelease: document.getElementById('kmBehHoldTriggerOnRelease').checked"
            '      };'
            '    } else if (type === ''tap-dance'') {'
            '      config = {'
            '        tappingTerm: document.getElementById(''kmBehTappingTerm'').value || ''200'','
            '        bindings: document.getElementById(''kmBehTdBindings'').value'
            '      };'
            '    } else if (type === ''mod-morph'') {'
            '      config = {'
            '        normalBinding: document.getElementById(''kmBehMmNormal'').value,'
            '        morphedBinding: document.getElementById(''kmBehMmMorphed'').value,'
            '        mods: document.getElementById(''kmBehMmMods'').value'
            '      };'
            '    } else if (type === ''sticky-key'') {'
            '      config = {'
            '        releaseAfter: document.getElementById(''kmBehSkRelease'').value || ''1000'','
            '        binding: document.getElementById(''kmBehSkBinding'').value,'
            "        quickRelease: document.getElementById('kmBehSkQuickRelease').checked,"
            "        lazy: document.getElementById('kmBehSkLazy').checked,"
            "        ignoreMods: document.getElementById('kmBehSkIgnoreMods').checked"
            '      };'
            '    } else if (type === ''key-toggle'') {'
            '      var ktCb = document.getElementById(''kmBehKtToggleMode'');'
            '      config = {'
            "        toggleMode: (ktCb && ktCb.checked) ? document.getElementById('kmBehKtToggleModeVal').value : ''"
            '      };'
            '    } else if (type === ''caps-word'') {'
            '      config = {'
            "        continueList: document.getElementById('kmBehCwContinueList').value || '',"
            "        mods: document.getElementById('kmBehCwMods').value || ''"
            '      };'
            '    } else if (type === ''macro'') {'
            '      config = {'
            '        macroParams: document.getElementById(''kmBehMacroParams'').value || ''0'','
            '        macroWait: document.getElementById(''kmBehMacroWait'').value,'
            '        macroTap: document.getElementById(''kmBehMacroTap'').value,'
            '        macroBindings: document.getElementById(''kmBehMacroBindings'').value'
            '      };'
            '    } else if (type === ''sensor-rotate'') {'
            '      config = {'
            '        sensorCW: document.getElementById(''kmBehSensorCW'').value,'
            '        sensorCCW: document.getElementById(''kmBehSensorCCW'').value,'
            '        sensorTap: document.getElementById(''kmBehSensorTap'').value'
            '      };'
            '    }'
        )
        
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        $removeCount = $behVarIdx - $cancelCorruptIdx
        for ($r = 0; $r -lt $removeCount; $r++) { $linesList.RemoveAt($cancelCorruptIdx) }
        for ($r = $saveHandlerStart.Count - 1; $r -ge 0; $r--) { $linesList.Insert($cancelCorruptIdx, $saveHandlerStart[$r]) }
        $lines = $linesList.ToArray()
        Write-Host "Fixed save handler config. Removed $removeCount, added $($saveHandlerStart.Count). Now $($lines.Count) lines"
    }
} else {
    Write-Host "Cancel handler corruption not found, skipping"
}

# ============================================================
# Fix 4: Save handler end - orphaned hold-tap/sticky-key edit lines
# After "style.display = 'none'" there are orphaned lines before "editingBehaviorIndex = -1"
# ============================================================

# Find the save handler's display=none + editingBehaviorIndex area
$displayNoneIdx = -1
$editingIdx = -1
# Search in the area after the save handler
for ($i = [Math]::Max(0, $lines.Count - 500); $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "kmBehaviorEditor.*style\.display\s*=\s*'none'" -and $displayNoneIdx -eq -1) {
        # Make sure it's in the save handler, not edit handler area
        if ($i -gt 5680) { $displayNoneIdx = $i }
    }
}
if ($displayNoneIdx -ge 0) {
    Write-Host "Found display=none at line $($displayNoneIdx + 1)"
    # Check what's between display=none and editingBehaviorIndex
    for ($i = $displayNoneIdx + 1; $i -lt ($displayNoneIdx + 20); $i++) {
        if ($lines[$i] -match 'editingBehaviorIndex\s*=\s*-1') {
            $editingIdx = $i
            break
        }
    }
    if ($editingIdx -ge 0 -and ($editingIdx - $displayNoneIdx) -gt 1) {
        # There are orphaned lines between display=none and editingBehaviorIndex
        $orphanCount = $editingIdx - $displayNoneIdx - 1
        Write-Host "Found $orphanCount orphaned lines after display=none, removing..."
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        for ($r = 0; $r -lt $orphanCount; $r++) { $linesList.RemoveAt($displayNoneIdx + 1) }
        $lines = $linesList.ToArray()
        Write-Host "Removed orphaned lines. Now $($lines.Count) lines"
    }
    
    # Now check for orphaned lines between populateBehaviorDropdown and updateKeymapOutput
    $populateIdx = -1
    $updateIdx = -1
    for ($i = $displayNoneIdx; $i -lt [Math]::Min($displayNoneIdx + 20, $lines.Count); $i++) {
        if ($lines[$i] -match 'populateBehaviorDropdown') { $populateIdx = $i }
        if ($lines[$i] -match 'updateKeymapOutput') { $updateIdx = $i; break }
    }
    if ($populateIdx -ge 0 -and $updateIdx -ge 0 -and ($updateIdx - $populateIdx) -gt 1) {
        $orphanCount2 = $updateIdx - $populateIdx - 1
        Write-Host "Found $orphanCount2 orphaned lines between populate and update, removing..."
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        for ($r = 0; $r -lt $orphanCount2; $r++) { $linesList.RemoveAt($populateIdx + 1) }
        $lines = $linesList.ToArray()
        Write-Host "Removed orphaned lines. Now $($lines.Count) lines"
    }
}

# ============================================================
# Fix 5: Behavior list events - broken renderKeymapBehaviorList
# Line has: "r else if (b.type === 'key-toggle') {...}enderKeymapBehaviorList();"
# ============================================================
$listEventsCorrupt = -1
for ($i = 5700; $i -lt [Math]::Min(5760, $lines.Count); $i++) {
    if ($lines[$i] -match 'enderKeymapBehaviorList') {
        $listEventsCorrupt = $i
        break
    }
}
if ($listEventsCorrupt -ge 0) {
    Write-Host "Found list events corruption at line $($listEventsCorrupt + 1): $($lines[$listEventsCorrupt])"
    
    # We need to find the start of this corruption block
    # It starts where "r else if (b.type === 'key-toggle')" is and ends with "enderKeymapBehaviorList();"
    # The whole block from "r else if..." through the caps-word block and "enderKeymapBehaviorList" should be:
    # "      renderKeymapBehaviorList();"
    
    # Find where the corruption starts - look back for the splice line
    $spliceIdx = -1
    for ($i = $listEventsCorrupt; $i -ge ($listEventsCorrupt - 15); $i--) {
        if ($lines[$i] -match 'keymapBehaviors\.splice') {
            $spliceIdx = $i
            break
        }
    }
    
    if ($spliceIdx -ge 0) {
        Write-Host "Found splice at line $($spliceIdx + 1)"
        # Everything between splice and the line with enderKeymapBehaviorList (inclusive) should be replaced
        # with just: renderKeymapBehaviorList();
        $removeStart = $spliceIdx + 1
        $removeEnd = $listEventsCorrupt
        $removeCount = $removeEnd - $removeStart + 1
        
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        for ($r = 0; $r -lt $removeCount; $r++) { $linesList.RemoveAt($removeStart) }
        $linesList.Insert($removeStart, '      renderKeymapBehaviorList();')
        $lines = $linesList.ToArray()
        Write-Host "Fixed list events. Removed $removeCount lines, added 1. Now $($lines.Count) lines"
    }
} else {
    Write-Host "List events corruption not found, skipping"
}

# ============================================================
# Fix 6: Behavior edit handler - add missing new fields
# After hold-tap's tapBinding line, add new fields
# After sticky-key's binding line, add new checkboxes  
# After sensor-rotate block, add key-toggle and caps-word edit branches
# ============================================================

# Find the edit handler's hold-tap section
$editHoldTapEnd = -1
for ($i = [Math]::Max(0, $lines.Count - 300); $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "kmBehTapBinding.*b\.config\.tapBinding" -and $lines[$i] -notmatch 'kmBehaviorType') {
        $editHoldTapEnd = $i
        break
    }
}

if ($editHoldTapEnd -ge 0) {
    Write-Host "Found edit hold-tap tapBinding at line $($editHoldTapEnd + 1)"
    
    # Insert new hold-tap fields after the tapBinding line
    $htNewFields = @(
        "        document.getElementById('kmBehQuickTap').value = b.config.quickTap || '';"
        "        document.getElementById('kmBehRequirePriorIdle').value = b.config.requirePriorIdle || '';"
        "        document.getElementById('kmBehHoldTriggerPositions').value = b.config.holdTriggerPositions || '';"
        "        document.getElementById('kmBehRetroTap').checked = !!b.config.retroTap;"
        "        document.getElementById('kmBehHoldWhileUndecided').checked = !!b.config.holdWhileUndecided;"
        "        document.getElementById('kmBehHoldWhileUndecidedLinger').checked = !!b.config.holdWhileUndecidedLinger;"
        "        document.getElementById('kmBehHoldTriggerOnRelease').checked = !!b.config.holdTriggerOnRelease;"
    )
    
    $linesList = [System.Collections.Generic.List[string]]::new($lines)
    for ($r = $htNewFields.Count - 1; $r -ge 0; $r--) {
        $linesList.Insert($editHoldTapEnd + 1, $htNewFields[$r])
    }
    $lines = $linesList.ToArray()
    Write-Host "Added hold-tap edit fields. Now $($lines.Count) lines"
}

# Find the edit handler's sticky-key section and add new checkboxes
$editSkEnd = -1
for ($i = [Math]::Max(0, $lines.Count - 300); $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "kmBehSkBinding.*b\.config\.binding") {
        $editSkEnd = $i
        break
    }
}
if ($editSkEnd -ge 0) {
    Write-Host "Found edit sticky-key binding at line $($editSkEnd + 1)"
    $skNewFields = @(
        "        document.getElementById('kmBehSkQuickRelease').checked = !!b.config.quickRelease;"
        "        document.getElementById('kmBehSkLazy').checked = !!b.config.lazy;"
        "        document.getElementById('kmBehSkIgnoreMods').checked = (b.config.ignoreMods !== undefined) ? !!b.config.ignoreMods : true;"
    )
    $linesList = [System.Collections.Generic.List[string]]::new($lines)
    for ($r = $skNewFields.Count - 1; $r -ge 0; $r--) {
        $linesList.Insert($editSkEnd + 1, $skNewFields[$r])
    }
    $lines = $linesList.ToArray()
    Write-Host "Added sticky-key edit fields. Now $($lines.Count) lines"
}

# Find the sensor-rotate edit block's closing and add key-toggle + caps-word edit branches
$sensorEditEnd = -1
for ($i = [Math]::Max(0, $lines.Count - 300); $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "kmBehSensorTap.*b\.config\.sensorTap") {
        $sensorEditEnd = $i
        break
    }
}
if ($sensorEditEnd -ge 0) {
    # Find the closing "}" for the sensor-rotate block
    $sensorClose = -1
    for ($i = $sensorEditEnd; $i -lt ($sensorEditEnd + 5); $i++) {
        if ($lines[$i].Trim() -eq '}') {
            $sensorClose = $i
            break
        }
    }
    if ($sensorClose -ge 0) {
        Write-Host "Found sensor-rotate close at line $($sensorClose + 1)"
        $newEditBranches = @(
            "      } else if (b.type === 'key-toggle') {"
            "        var ktHasMode = !!b.config.toggleMode;"
            "        var ktCb = document.getElementById('kmBehKtToggleMode');"
            "        if (ktCb) ktCb.checked = ktHasMode;"
            "        var ktRow = document.getElementById('kmBehKtToggleModeRow');"
            "        if (ktRow) ktRow.style.display = ktHasMode ? '' : 'none';"
            "        if (ktHasMode) { var ktVal = document.getElementById('kmBehKtToggleModeVal'); if (ktVal) ktVal.value = b.config.toggleMode; }"
            "      } else if (b.type === 'caps-word') {"
            "        document.getElementById('kmBehCwContinueList').value = b.config.continueList || '';"
            "        document.getElementById('kmBehCwMods').value = b.config.mods || '';"
        )
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        for ($r = $newEditBranches.Count - 1; $r -ge 0; $r--) {
            $linesList.Insert($sensorClose + 1, $newEditBranches[$r])
        }
        $lines = $linesList.ToArray()
        Write-Host "Added key-toggle and caps-word edit branches. Now $($lines.Count) lines"
    }
}

# ============================================================
# Write the fixed file back to disk
# ============================================================
Write-Host "`nWriting fixed file..."
[System.IO.File]::WriteAllLines($filePath, $lines)
Write-Host "Done! Final file has $($lines.Count) lines"
