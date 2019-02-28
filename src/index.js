module.exports = function solveSudoku(matrix) {
    const position = getEmptyPosition(matrix);

    if (!position) {
        return matrix;
    }

    const {row, col} = position;

    for (let value = 1; value < 10; value++) {
        matrix[row][col] = value;
        if (isValid(matrix, {row, col})) {
            if (solveSudoku(matrix)) {
                return matrix;
            }
        }
        matrix[row][col] = 0;
    }
    return false;
};

const getEmptyPosition = matrix => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (matrix[row][col] === 0) {
                return {row, col};
            }
        }
    }
};

const isValid = (matrix, position) => {
    return isValidInRow(matrix, position) && isValidInCol(matrix, position) && isValidInSquare(matrix, position);
};

const isValidInRow = (matrix, {row, col}) => {
    for (let i = 0; i < 9; i++) {
        if (col !== i && matrix[row][i] === matrix[row][col]) {
            return false;
        }
    }
    return true;
};

const isValidInCol = (matrix, {row, col}) => {
    for (let i = 0; i < 9; i++) {
        if (row !== i && matrix[i][col] === matrix[row][col]) {
            return false;
        }
    }
    return true;
};

const isValidInSquare = (matrix, {row, col}) => {
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(col / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            if (row !== i && col !== j && matrix[row][col] === matrix[i][j]) {
                return false;
            }
        }
    }
    return true;
};
