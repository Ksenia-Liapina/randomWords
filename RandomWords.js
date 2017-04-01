/**
 * Created by hp on 12.11.2016.
 */
{
    var fs = require('fs');
    var contents = fs.readFileSync('ikea.txt', 'utf8');
    var mass = contents.split('\r\n');
    var stringWithAllWords = ' ';
    for (var i = 0; i < mass.length; i++) {
        stringWithAllWords = stringWithAllWords + " " + mass[i];
    }
    contents = stringWithAllWords;
    var allLines = new String();
    for (var i = 0; i < contents.length; i++) {
        if (contents.charAt(i) != ' ') {
            allLines = allLines + contents.charAt(i);
        } else {
            allLines = allLines + "#" + contents.charAt(i);
        }
    }

    //console.log(allLines);

    //метод для создания двумерного массива
    function matrixArray(rows, columns) {
        var arr = new Array();
        for (var i = 0; i < columns; i++) {
            arr[i] = new Array();
            for (var j = 0; j < rows; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }

    var dictionary = [];
    dictionary.push(allLines.charAt(0));
    //var lengthOfGram = 2;
    for (var i = 1; i < allLines.length; i++) {
        for (var j = 0; j < dictionary.length; j++) {
            if (dictionary[j] == allLines.charAt(i)) break;
            if (j == dictionary.length - 1)
                dictionary.push(allLines.charAt(i));
        }
    }
    console.log(dictionary.join(""))


    //составление матрицы биграмм
    var table = matrixArray(dictionary.length + 1, dictionary.length);
    var firstWord = allLines.charAt(0);
    var firstIndex = 0;
    var secondWord;
    var secondIndex;
    for (var i = 0; i < allLines.length - 1; i++) {
        secondWord = allLines.charAt(i + 1);
        for (var k = 0; k < dictionary.length; k++) {
            if (secondWord == dictionary[k]) secondIndex = k;
            continue;
        }
        table[firstIndex][secondIndex] += 1;
        firstIndex = secondIndex;
        firstWord = secondWord;
    }

    var sum = 0;
    for (var i = 0; i < dictionary.length; i++) {
        for (var j = 0; j < dictionary.length; j++) {
            sum += table[i][j];
        }
        table[i][dictionary.length] += sum;
        sum = 0;
    }
    for (var i = 0; i < dictionary.length; i++) {
        table[i][dictionary.length + 1] = dictionary[i];
    }
    console.log(table.join('\n'));


    //функция для генерации случайного числа в интервале
    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }
    var indexOfRandom = 0;
    for (var i = 0; i < dictionary.length; i++)
    {
        if (dictionary[i] == ' ')
        {
            indexOfRandom = i;
            break;
        }
        else {continue;}
    }
    var word = dictionary[indexOfRandom];
    var maxRand = table[indexOfRandom][dictionary.length];
    var newWord = word;
    var sumPrev = 0;
    var normalIndex = indexOfRandom;
    var sumCur = 0;
    while (word != "#")
    {
        sumCur = 0;
        sumPrev = 0;
        indexOfRandom = randomInteger(1, maxRand);
        var probabilityFinal = 1;
        for (var i=0;i<dictionary.length;i++)
        {
            if (table[normalIndex][i] == 0) continue;
            else {
                sumPrev = sumCur;
                countOfReap = table[normalIndex][i];
                countOfVariants = table[normalIndex][dictionary.length];
                sumCur += countOfReap

                if ((sumPrev < indexOfRandom) && (sumCur >= indexOfRandom)) {
                    normalIndex = i;
                    word = dictionary[normalIndex];
                    maxRand = table[normalIndex][dictionary.length];
                    probabilityCurrent = countOfReap/countOfVariants;
                    probabilityFinal*=probabilityCurrent;
                    newWord+=word;
                    break;
                }
                else { continue;
                }
            }
        }

    };

    console.log(newWord.substr(1,newWord.length-2));
    console.log(probabilityFinal);

}

