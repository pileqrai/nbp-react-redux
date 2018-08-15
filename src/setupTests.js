const localStorageMock = {
    getItem: () => null,
    setItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;