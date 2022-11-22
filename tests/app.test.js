test('Should display all users and their followers', async () => {
    const data = await userData;
    expect(data).toBe(fs.readFile("user.txt", "ascii"));
});

//test('Hello world', () => {

})
