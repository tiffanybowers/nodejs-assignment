// const { default: test } = require("node:test")

// const { exportAllDeclaration } = require("@babel/types");

test('Should display all users and their followers', async () => {
    const data = await userData;
    expect(data).toBe(fs.readFile("user.txt", "ascii"));
});

test('Hello world', () => {

})

test('Second Hello World', () => {
    throw new Error('Failure!')
})