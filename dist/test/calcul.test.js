"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calcul_1 = __importDefault(require("../src/calcul"));
describe("Calcul", () => {
    it('should return 13', function () {
        let a = 3;
        let b = 10;
        let expected = 13;
        expect(calcul_1.default.somme(a, b)).toBe(expected);
    });
});
