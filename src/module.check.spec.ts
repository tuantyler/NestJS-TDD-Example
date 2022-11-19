function moduleAvailable(name) {
    try {
        require.resolve(name);
        return true;
    } catch(e){}
    return false;
}

describe('Check modules are defined', () => {
    it('Todo module should be defined', () => {
        expect(moduleAvailable("./todo/todo.entity/todo.entity")).toBeTruthy()
    });
    it('Todo controller should be defined', () => {
        expect(moduleAvailable("./todo/todo.controller")).toBeTruthy()
    });
    it('Todo entity should be defined', () => {
        expect(moduleAvailable("./todo/todo.module")).toBeTruthy()
    });
});


