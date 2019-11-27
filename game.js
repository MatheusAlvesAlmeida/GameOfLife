let currentGeneration;
let cols;
let rows;
let resolution = 40;

//Função para fazer a matriz
function makeMatrix(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    frameRate(2);
    createCanvas(800, 600);
    //Para garantir que seja dinâmico
    cols = width / resolution;
    rows = height / resolution;

    currentGeneration = makeMatrix(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            currentGeneration[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0);
    //Preenche com preto os locais com celulas vivas
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (currentGeneration[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution, resolution);
            }
        }
    }
    let newGeneration = makeMatrix(cols, rows);
    //Preenchendo a nova geração
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = currentGeneration[i][j];
            let sum = 0;
            //Verificar os limites da matriz começando pelas pontas, então verifica o meio da matriz.
            if (i == 0 && j == 0) {
                sum += currentGeneration[i][j + 1];
                sum += currentGeneration[i + 1][j];
                sum += currentGeneration[i + 1][j + 1];
            } else if (i == 0 && j == rows - 1) {
                sum += currentGeneration[i][j - 1];
                sum += currentGeneration[i + 1][j];
                sum += currentGeneration[i + 1][j - 1];
            } else if (i == cols - 1 && j == 0) {
                sum += currentGeneration[i - 1][j];
                sum += currentGeneration[i - 1][j + 1];
                sum += currentGeneration[i][j + 1];
            } else if (i == cols - 1 && j == rows - 1) {
                sum += currentGeneration[i - 1][j];
                sum += currentGeneration[i - 1][j - 1];
                sum += currentGeneration[i][j - 1];
            } else if (i == 0) {
                sum += currentGeneration[i][j - 1];
                sum += currentGeneration[i][j + 1];
                sum += currentGeneration[i + 1][j];
                sum += currentGeneration[i + 1][j - 1];
                sum += currentGeneration[i + 1][j + 1];
            } else if (i == cols - 1) {
                sum += currentGeneration[i - 1][j];
                sum += currentGeneration[i - 1][j - 1];
                sum += currentGeneration[i - 1][j + 1];
                sum += currentGeneration[i][j - 1];
                sum += currentGeneration[i][j + 1];
            } else if (j == 0) {
                sum += currentGeneration[i - 1][j];
                sum += currentGeneration[i - 1][j + 1];
                sum += currentGeneration[i][j + 1];
                sum += currentGeneration[i + 1][j];
                sum += currentGeneration[i + 1][j + 1];
            } else if (j == rows - 1) {
                sum += currentGeneration[i - 1][j];
                sum += currentGeneration[i - 1][j - 1];
                sum += currentGeneration[i][j - 1];
                sum += currentGeneration[i + 1][j];
                sum += currentGeneration[i + 1][j - 1];
            } else {
                sum += currentGeneration[i - 1][j];
                sum += currentGeneration[i - 1][j - 1];
                sum += currentGeneration[i - 1][j + 1];
                sum += currentGeneration[i][j - 1];
                sum += currentGeneration[i][j + 1];
                sum += currentGeneration[i + 1][j];
                sum += currentGeneration[i + 1][j - 1];
                sum += currentGeneration[i + 1][j + 1];
            }
            //Aplicando as regras para gerar a nova geração de células
            if (state == 0 && sum == 3) {
                newGeneration[i][j] = 1;
            } else if (state == 1 && (sum > 3 || sum < 2)) {
                newGeneration[i][j] = 0;
            } else {
                newGeneration[i][j] = currentGeneration[i][j];
            }
        }
    }
    currentGeneration = newGeneration;
}