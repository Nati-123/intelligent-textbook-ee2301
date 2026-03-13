// Minterm/Maxterm Converter MicroSim
// Convert between SOP and POS canonical forms
// Bloom Level: Apply (L3) - Calculate, convert, derive
// MicroSim template version 2026.02

(function () {
    'use strict';

    var VAR_NAMES = ['A', 'B', 'C', 'D'];

    // State
    var numVars  = 3;
    var minterms = [];
    var maxterms = [];

    // DOM references
    var mintermInput    = document.getElementById('mintermInput');
    var numVarsSelect   = document.getElementById('numVarsSelect');
    var generateBtn     = document.getElementById('generateBtn');
    var errorBox        = document.getElementById('errorBox');
    var resultsArea     = document.getElementById('resultsArea');
    var sopCompact      = document.getElementById('sopCompact');
    var sopExpanded     = document.getElementById('sopExpanded');
    var posCompact      = document.getElementById('posCompact');
    var posExpanded     = document.getElementById('posExpanded');
    var convExplanation = document.getElementById('convExplanation');
    var truthTable      = document.getElementById('truthTable');

    // ── Helpers ──────────────────────────────────────────────

    /** Wrap a character in an overline span (complement notation) */
    function ov(ch) {
        return '<span class="ov">' + ch + '</span>';
    }

    /** Build the expanded SOP expression as HTML */
    function buildSopHTML() {
        var total = 1 << numVars;
        if (minterms.length === 0)     return '0';
        if (minterms.length === total) return '1';

        var terms = [];
        for (var k = 0; k < minterms.length; k++) {
            var m = minterms[k];
            var t = '';
            for (var i = 0; i < numVars; i++) {
                var bit = (m >> (numVars - 1 - i)) & 1;
                t += (bit === 0) ? ov(VAR_NAMES[i]) : VAR_NAMES[i];
            }
            terms.push(t);
        }

        // Break into lines if many terms (>4 terms → ~4 per line)
        if (terms.length <= 4) return terms.join(' + ');

        var lines = [];
        for (var j = 0; j < terms.length; j += 4) {
            lines.push(terms.slice(j, j + 4).join(' + '));
        }
        return lines.join('<br>');
    }

    /** Build the expanded POS expression as HTML (multiline when long) */
    function buildPosHTML() {
        var total = 1 << numVars;
        if (maxterms.length === 0)     return '1';
        if (maxterms.length === total) return '0';

        var terms = [];
        for (var k = 0; k < maxterms.length; k++) {
            var m = maxterms[k];
            var lits = [];
            for (var i = 0; i < numVars; i++) {
                var bit = (m >> (numVars - 1 - i)) & 1;
                lits.push((bit === 1) ? ov(VAR_NAMES[i]) : VAR_NAMES[i]);
            }
            terms.push('(' + lits.join(' + ') + ')');
        }

        // Group terms per line based on variable count
        var perLine = (numVars <= 3) ? 3 : 2;
        if (terms.length <= perLine) return terms.join('');

        var lines = [];
        for (var j = 0; j < terms.length; j += perLine) {
            lines.push(terms.slice(j, j + perLine).join(''));
        }
        return lines.join('<br>');
    }

    // ── Truth table ──────────────────────────────────────────

    function buildTruthTable() {
        var total = 1 << numVars;
        var vars  = VAR_NAMES.slice(0, numVars);

        var h = '<thead><tr>';
        for (var v = 0; v < vars.length; v++) h += '<th>' + vars[v] + '</th>';
        h += '<th>F</th><th>Minterm</th><th>Maxterm</th>';
        h += '</tr></thead><tbody>';

        for (var r = 0; r < total; r++) {
            var isOn = minterms.indexOf(r) !== -1;
            h += '<tr>';

            // Variable columns
            for (var i = 0; i < numVars; i++) {
                h += '<td>' + ((r >> (numVars - 1 - i)) & 1) + '</td>';
            }

            // F column
            h += '<td class="' + (isOn ? 'f-one' : 'f-zero') + '">';
            h += isOn ? '1' : '0';
            h += '</td>';

            // Minterm column
            h += '<td class="' + (isOn ? 'm-on' : 'm-off') + '">';
            h += isOn ? 'm<sub>' + r + '</sub>' : '\u2014';
            h += '</td>';

            // Maxterm column
            h += '<td class="' + (!isOn ? 'M-on' : 'M-off') + '">';
            h += !isOn ? 'M<sub>' + r + '</sub>' : '\u2014';
            h += '</td>';

            h += '</tr>';
        }

        h += '</tbody>';
        truthTable.innerHTML = h;
    }

    // ── Display ──────────────────────────────────────────────

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.classList.remove('hidden');
        resultsArea.classList.add('hidden');
    }

    function hideError() {
        errorBox.classList.add('hidden');
        resultsArea.classList.remove('hidden');
    }

    function updateDisplay() {
        var vars = VAR_NAMES.slice(0, numVars).join(', ');

        // SOP
        sopCompact.innerHTML  = 'F(' + vars + ') = \u03A3m(' + minterms.join(', ') + ')';
        sopExpanded.innerHTML = '= ' + buildSopHTML();

        // POS
        posCompact.innerHTML  = 'F(' + vars + ') = \u03A0M(' + maxterms.join(', ') + ')';
        posExpanded.innerHTML = '= ' + buildPosHTML();

        // Conversion explanation
        var total = 1 << numVars;
        var all   = [];
        for (var i = 0; i < total; i++) all.push(i);

        convExplanation.innerHTML =
            'Maxterm indices = All indices \u2212 Minterm indices<br>' +
            '<span class="set">{' + all.join(', ') + '}</span> \u2212 ' +
            '<span class="set">{' + minterms.join(', ') + '}</span> = ' +
            '<span class="set">{' + maxterms.join(', ') + '}</span>';

        // Truth table
        buildTruthTable();
    }

    // ── Core logic ───────────────────────────────────────────

    function handleGenerate() {
        minterms = [];
        maxterms = [];

        var input = mintermInput.value.trim();
        if (!input) {
            showError('Please enter minterm indices (e.g. 1, 3, 5, 7)');
            return;
        }

        var total  = 1 << numVars;
        var parts  = input.split(',');
        var parsed = {};
        var list   = [];

        for (var k = 0; k < parts.length; k++) {
            var v = parseInt(parts[k].trim(), 10);
            if (isNaN(v)) {
                showError('Invalid input: \u201C' + parts[k].trim() + '\u201D');
                return;
            }
            if (v < 0 || v >= total) {
                showError('Index ' + v + ' out of range (0\u2013' + (total - 1) + ') for ' + numVars + ' variables');
                return;
            }
            if (!parsed[v]) {
                parsed[v] = true;
                list.push(v);
            }
        }

        minterms = list.sort(function (a, b) { return a - b; });

        for (var i = 0; i < total; i++) {
            if (minterms.indexOf(i) === -1) maxterms.push(i);
        }

        hideError();
        updateDisplay();
    }

    // ── Events ───────────────────────────────────────────────

    generateBtn.addEventListener('click', handleGenerate);

    numVarsSelect.addEventListener('change', function () {
        numVars = parseInt(numVarsSelect.value, 10);
        handleGenerate();
    });

    mintermInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') handleGenerate();
    });

    // ── Initialise ───────────────────────────────────────────
    handleGenerate();

})();
