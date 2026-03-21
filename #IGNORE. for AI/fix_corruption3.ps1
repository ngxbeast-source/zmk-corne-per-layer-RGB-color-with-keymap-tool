$filePath = "e:\Github\NGX_Corne\RGB_Code_Helper.html"
$lines = [System.IO.File]::ReadAllLines($filePath)
Write-Host "Read $($lines.Count) lines"

# ============================================================
# Fix A: Line 2718 (0-indexed 2717) - caps-word parser truncated
# Current: config = { continueList: cwcl ? cwcl[1].trim() : '', mods: cwmods ? cwmods[1].trim()
# Should be: config = { continueList: cwcl ? cwcl[1].trim() : '', mods: cwmods ? cwmods[1].trim() : '' };
# ============================================================
for ($i = 2715; $i -lt 2720; $i++) {
    if ($lines[$i] -match "cwmods\s*\?\s*cwmods\[1\]\.trim\(\)\s*$") {
        $lines[$i] = "        config = { continueList: cwcl ? cwcl[1].trim() : '', mods: cwmods ? cwmods[1].trim() : '' };"
        Write-Host "Fixed caps-word parser at line $($i + 1)"
        break
    }
}

# ============================================================
# Fix B: Combo edit handler corruption (lines ~5450-5464)
# Replace from "ifdocument..." through the misplaced requirePriorIdle line
# with clean combo edit handler
# ============================================================
$comboEditStart = -1
for ($i = 5445; $i -lt 5465; $i++) {
    if ($lines[$i] -match '^    ifdocument') {
        $comboEditStart = $i
        break
    }
}

if ($comboEditStart -ge 0) {
    # Find where the });  line is (closing the listener)
    $comboEditEnd = -1
    for ($i = $comboEditStart; $i -lt ($comboEditStart + 25); $i++) {
        if ($lines[$i].Trim() -eq '});') {
            $comboEditEnd = $i
            break
        }
    }
    
    if ($comboEditEnd -ge 0) {
        Write-Host "Replacing combo edit handler: lines $($comboEditStart+1) to $($comboEditEnd+1)"
        
        $cleanComboEdit = @(
            "    if (e.target.dataset.editCombo !== undefined) {"
            "      var ci = parseInt(e.target.dataset.editCombo);"
            "      editingComboIndex = ci;"
            "      var c = keymapCombos[ci];"
            "      document.getElementById('kmComboName').value = c.name;"
            "      document.getElementById('kmComboBind').value = c.binding;"
            "      document.getElementById('kmComboTimeout').value = c.timeout;"
            "      document.getElementById('kmComboLayers').value = c.layers;"
            "      document.getElementById('kmComboSlowRelease').checked = !!c.slowRelease;"
            "      document.getElementById('kmComboRequirePriorIdle').value = c.requirePriorIdle || '';"
            "      populateComboKeyPositionCheckboxes();"
            "      if (c.keyPositions && c.keyPositions.length) {"
            "        c.keyPositions.forEach(function(pos) {"
            "          var cb = document.querySelector('#comboKeyPositions input[value=""' + pos + '""]');"
            "          if (cb) cb.checked = true;"
            "        });"
            "      }"
            "      renderComboMiniKb();"
            "      document.getElementById('comboEditor').style.display = '';"
            "    }"
            "  });"
        )
        
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        $removeCount = $comboEditEnd - $comboEditStart + 1
        for ($r = 0; $r -lt $removeCount; $r++) { $linesList.RemoveAt($comboEditStart) }
        for ($r = $cleanComboEdit.Count - 1; $r -ge 0; $r--) {
            $linesList.Insert($comboEditStart, $cleanComboEdit[$r])
        }
        $lines = $linesList.ToArray()
        Write-Host "Fixed combo edit handler. Removed $removeCount, added $($cleanComboEdit.Count). Now $($lines.Count) lines"
    }
} else {
    Write-Host "Combo edit corruption not found, skipping"
}

# ============================================================
# Fix C: Save handler caps-word end corruption (line ~5690)
# Current: mods: document.getElementById('kmBehCwMods').value || ''w_behavior',
# Next line: type: type,
# Should be: mods: document.getElementById('kmBehCwMods').value || ''
#            };
#          }
#          var beh = {
#            name: document.getElementById('kmBehaviorName').value || 'new_behavior',
#            type: type,
# ============================================================
$cwCorruptIdx = -1
for ($i = 5680; $i -lt 5700; $i++) {
    if ($i -lt $lines.Count -and $lines[$i] -match "kmBehCwMods.*w_behavior") {
        $cwCorruptIdx = $i
        break
    }
}

if ($cwCorruptIdx -ge 0) {
    Write-Host "Found caps-word/beh corruption at line $($cwCorruptIdx + 1)"
    # The current line has the end of caps-word config merged with var beh declaration
    # Replace this line and the next line (type: type,)
    $lines[$cwCorruptIdx] = "        mods: document.getElementById('kmBehCwMods').value || ''"
    
    # Check if next line is "      type: type," - need to insert closing and var beh before it
    $nextIdx = $cwCorruptIdx + 1
    if ($lines[$nextIdx] -match '^\s+type:\s*type') {
        Write-Host "Inserting var beh lines before type: at line $($nextIdx + 1)"
        $insertLines = @(
            "      };"
            "    }"
            "    var beh = {"
            "      name: document.getElementById('kmBehaviorName').value || 'new_behavior',"
        )
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        for ($r = $insertLines.Count - 1; $r -ge 0; $r--) {
            $linesList.Insert($nextIdx, $insertLines[$r])
        }
        $lines = $linesList.ToArray()
        Write-Host "Inserted var beh block. Now $($lines.Count) lines"
    }
} else {
    Write-Host "Caps-word/beh corruption not found, skipping"
}

# Write the fixed file
Write-Host "`nWriting fixed file..."
[System.IO.File]::WriteAllLines($filePath, $lines)
Write-Host "Done! Final file has $($lines.Count) lines"
