$filePath = "e:\Github\NGX_Corne\RGB_Code_Helper.html"
$lines = [System.IO.File]::ReadAllLines($filePath)
Write-Host "Read $($lines.Count) lines"

# ============================================================
# Fix A: List events corruption (lines 5714-5724 area)
# After splice line, replace corrupted key-toggle/caps-word/enderKeymapBehaviorList block
# with just: renderKeymapBehaviorList();
# ============================================================
$spliceIdx = -1
for ($i = 5710; $i -lt 5720; $i++) {
    if ($lines[$i] -match 'keymapBehaviors\.splice') {
        $spliceIdx = $i
        break
    }
}

$enderIdx = -1
for ($i = 5720; $i -lt 5730; $i++) {
    if ($lines[$i] -match 'enderKeymapBehaviorList') {
        $enderIdx = $i
        break
    }
}

if ($spliceIdx -ge 0 -and $enderIdx -ge 0) {
    $removeStart = $spliceIdx + 1
    $removeCount = $enderIdx - $removeStart + 1
    Write-Host "Removing list events corruption: lines $($removeStart+1) to $($enderIdx+1) ($removeCount lines)"
    
    $linesList = [System.Collections.Generic.List[string]]::new($lines)
    for ($r = 0; $r -lt $removeCount; $r++) { $linesList.RemoveAt($removeStart) }
    $linesList.Insert($removeStart, '      renderKeymapBehaviorList();')
    $lines = $linesList.ToArray()
    Write-Host "Fixed. Now $($lines.Count) lines"
} else {
    Write-Host "List events: splice=$spliceIdx, ender=$enderIdx - skipping"
}

# ============================================================
# Fix B: Add new hold-tap edit fields after tapBinding line
# ============================================================
$htEditIdx = -1
for ($i = 5720; $i -lt 5760; $i++) {
    if ($i -lt $lines.Count -and $lines[$i] -match "kmBehTapBinding.*b\.config\.tapBinding") {
        $htEditIdx = $i
        break
    }
}
if ($htEditIdx -ge 0) {
    Write-Host "Found hold-tap tapBinding edit at line $($htEditIdx + 1)"
    $htFields = @(
        "        document.getElementById('kmBehQuickTap').value = b.config.quickTap || '';"
        "        document.getElementById('kmBehRequirePriorIdle').value = b.config.requirePriorIdle || '';"
        "        document.getElementById('kmBehHoldTriggerPositions').value = b.config.holdTriggerPositions || '';"
        "        document.getElementById('kmBehRetroTap').checked = !!b.config.retroTap;"
        "        document.getElementById('kmBehHoldWhileUndecided').checked = !!b.config.holdWhileUndecided;"
        "        document.getElementById('kmBehHoldWhileUndecidedLinger').checked = !!b.config.holdWhileUndecidedLinger;"
        "        document.getElementById('kmBehHoldTriggerOnRelease').checked = !!b.config.holdTriggerOnRelease;"
    )
    $linesList = [System.Collections.Generic.List[string]]::new($lines)
    for ($r = $htFields.Count - 1; $r -ge 0; $r--) {
        $linesList.Insert($htEditIdx + 1, $htFields[$r])
    }
    $lines = $linesList.ToArray()
    Write-Host "Added hold-tap edit fields. Now $($lines.Count) lines"
} else {
    Write-Host "Hold-tap tapBinding edit not found, skipping"
}

# ============================================================
# Fix C: Add new sticky-key edit checkboxes after binding line
# ============================================================
$skEditIdx = -1
for ($i = 5730; $i -lt 5770; $i++) {
    if ($i -lt $lines.Count -and $lines[$i] -match "kmBehSkBinding.*b\.config\.binding") {
        $skEditIdx = $i
        break
    }
}
if ($skEditIdx -ge 0) {
    Write-Host "Found sticky-key binding edit at line $($skEditIdx + 1)"
    $skFields = @(
        "        document.getElementById('kmBehSkQuickRelease').checked = !!b.config.quickRelease;"
        "        document.getElementById('kmBehSkLazy').checked = !!b.config.lazy;"
        "        document.getElementById('kmBehSkIgnoreMods').checked = (b.config.ignoreMods !== undefined) ? !!b.config.ignoreMods : true;"
    )
    $linesList = [System.Collections.Generic.List[string]]::new($lines)
    for ($r = $skFields.Count - 1; $r -ge 0; $r--) {
        $linesList.Insert($skEditIdx + 1, $skFields[$r])
    }
    $lines = $linesList.ToArray()
    Write-Host "Added sticky-key edit fields. Now $($lines.Count) lines"
} else {
    Write-Host "Sticky-key binding edit not found, skipping"
}

# ============================================================
# Fix D: Add key-toggle + caps-word edit branches after sensor-rotate
# ============================================================
$sensorEditIdx = -1
for ($i = 5750; $i -lt 5790; $i++) {
    if ($i -lt $lines.Count -and $lines[$i] -match "kmBehSensorTap.*b\.config\.sensorTap") {
        $sensorEditIdx = $i
        break
    }
}
if ($sensorEditIdx -ge 0) {
    # Find the closing "}" for sensor-rotate right after
    $closeIdx = -1
    for ($i = $sensorEditIdx + 1; $i -lt ($sensorEditIdx + 4); $i++) {
        if ($lines[$i].Trim() -eq '}') {
            $closeIdx = $i
            break
        }
    }
    if ($closeIdx -ge 0) {
        Write-Host "Found sensor-rotate close at line $($closeIdx + 1)"
        $newBranches = @(
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
        for ($r = $newBranches.Count - 1; $r -ge 0; $r--) {
            $linesList.Insert($closeIdx + 1, $newBranches[$r])
        }
        $lines = $linesList.ToArray()
        Write-Host "Added key-toggle/caps-word edit branches. Now $($lines.Count) lines"
    }
} else {
    Write-Host "Sensor-rotate edit not found, skipping"
}

# ============================================================
# Write the fixed file
# ============================================================
Write-Host "`nWriting fixed file..."
[System.IO.File]::WriteAllLines($filePath, $lines)
Write-Host "Done! Final file has $($lines.Count) lines"
