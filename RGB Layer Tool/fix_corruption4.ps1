$filePath = "e:\Github\NGX_Corne\RGB_Code_Helper.html"
$lines = [System.IO.File]::ReadAllLines($filePath)
Write-Host "Read $($lines.Count) lines"

# ============================================================
# Fix A: Remove duplicate save handler start (3 lines before the real one)
# Lines: 
#   document.getElementById('kmBehaviorSaveBtn').onclick = function() {
#     pushUndo();
#     var type = document.getElementById('kmBehaviorType').value;
#     (blank)
#   document.getElementById('kmBehaviorSaveBtn').onclick = function() {  <-- real start
# ============================================================
# Find the first kmBehaviorSaveBtn line
$firstSaveIdx = -1
for ($i = 5625; $i -lt 5645; $i++) {
    if ($lines[$i] -match 'kmBehaviorSaveBtn.*onclick') {
        $firstSaveIdx = $i
        break
    }
}

if ($firstSaveIdx -ge 0) {
    # Check if the next occurrence is within a few lines (indicating duplicate)
    $secondSaveIdx = -1
    for ($i = $firstSaveIdx + 1; $i -lt ($firstSaveIdx + 8); $i++) {
        if ($lines[$i] -match 'kmBehaviorSaveBtn.*onclick') {
            $secondSaveIdx = $i
            break
        }
    }
    
    if ($secondSaveIdx -ge 0) {
        # Remove lines from firstSaveIdx to secondSaveIdx - 1
        $removeCount = $secondSaveIdx - $firstSaveIdx
        Write-Host "Removing duplicate save handler start: lines $($firstSaveIdx+1) to $($secondSaveIdx) ($removeCount lines)"
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        for ($r = 0; $r -lt $removeCount; $r++) { $linesList.RemoveAt($firstSaveIdx) }
        $lines = $linesList.ToArray()
        Write-Host "Removed. Now $($lines.Count) lines"
    } else {
        Write-Host "No duplicate save handler found"
    }
} else {
    Write-Host "Save handler not found"
}

# ============================================================
# Fix B: Fix broken save handler ending after editingBehaviorIndex check
# Current:
#     if (editingBehaviorIndex >= 0) {
#       beh._fromEditor = keymapBehaviors[editingBehaviorIndex]._fromEditor || false;
#     renderKeymapBehaviorList();
# Should be:
#     if (editingBehaviorIndex >= 0) {
#       beh._fromEditor = keymapBehaviors[editingBehaviorIndex]._fromEditor || false;
#       keymapBehaviors[editingBehaviorIndex] = beh;
#     } else {
#       beh._fromEditor = true;
#       keymapBehaviors.push(beh);
#     }
#     document.getElementById('kmBehaviorEditor').style.display = 'none';
#     editingBehaviorIndex = -1;
#     renderKeymapBehaviorList();
# ============================================================
$fromEditorIdx = -1
for ($i = 5690; $i -lt 5710; $i++) {
    if ($i -lt $lines.Count -and $lines[$i] -match '_fromEditor.*keymapBehaviors\[editingBehaviorIndex\]\._fromEditor') {
        $fromEditorIdx = $i
        break
    }
}

if ($fromEditorIdx -ge 0) {
    # Check if next line is renderKeymapBehaviorList (missing the else branch)
    $nextIdx = $fromEditorIdx + 1
    if ($lines[$nextIdx] -match 'renderKeymapBehaviorList') {
        Write-Host "Found broken save handler end at line $($fromEditorIdx + 1)"
        $insertLines = @(
            "      keymapBehaviors[editingBehaviorIndex] = beh;"
            "    } else {"
            "      beh._fromEditor = true;"
            "      keymapBehaviors.push(beh);"
            "    }"
            "    document.getElementById('kmBehaviorEditor').style.display = 'none';"
            "    editingBehaviorIndex = -1;"
        )
        $linesList = [System.Collections.Generic.List[string]]::new($lines)
        for ($r = $insertLines.Count - 1; $r -ge 0; $r--) {
            $linesList.Insert($nextIdx, $insertLines[$r])
        }
        $lines = $linesList.ToArray()
        Write-Host "Fixed save handler end. Now $($lines.Count) lines"
    } else {
        Write-Host "Save handler end appears okay"
    }
} else {
    Write-Host "fromEditor line not found"
}

# Write
Write-Host "`nWriting fixed file..."
[System.IO.File]::WriteAllLines($filePath, $lines)
Write-Host "Done! Final: $($lines.Count) lines"
