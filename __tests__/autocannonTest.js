const autocannon = require('autocannon');

async function testGet() {
    const instance = autocannon({
        url: 'http://localhost:3000/api/users',
        connections: 100,
        duration: 10,
    });

    autocannon.track(instance);
    console.log('GET test completed.');
}

async function testPost() {
    const instance = autocannon({
        url: 'http://localhost:3000/api/users',
        connections: 100,
        duration: 10,
        body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    autocannon.track(instance);
    console.log('POST test completed.');
}

async function testPut() {
    const instance = autocannon({
        url: 'http://localhost:3000/api/users/1',
        connections: 100,
        duration: 10,
        body: JSON.stringify({
            name: 'Updated Name',
            email: 'updated@example.com',
            password: 'newpassword123',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    });

    autocannon.track(instance);
    console.log('PUT test completed.');
}

const deleteTest = async () => {
    const instance = autocannon({
        url: 'http://localhost:3000/api/users/1',
        connections: 10,
        duration: 10,
        method: 'DELETE',
    });

    autocannon.track(instance);
    console.log('DELETE test completed.');
};

async function runTests() {
    console.log('Starting GET test...');
    await testGet();

    console.log('Starting POST test...');
    await testPost();

    console.log('Starting PUT test...');
    await testPut();

    console.log('Starting DELETE Test...');
    await deleteTest();
}

runTests();
