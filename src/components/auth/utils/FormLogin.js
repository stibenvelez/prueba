export const LoginFormMock = {
    user: 'admin',
    password: 'admin',
};

export const LoginFormMockError = {
    user: 'admidsdsfsdfsdn',
    password: 'dfsdfsdfszdf',
};

export const LoginFormMockEmpty = {
    user: '',
    password: '',
};


export const fetchUsers = async () => {
    try {
        return await axios.get(`${BASE_URL}/users`);
    } catch (e) {
        return [];
    }
};
