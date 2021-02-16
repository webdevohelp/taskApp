const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

// add(1, 2)
//     .then((sum) => {
//         console.log(sum);
//         add(sum, 3)
//             .then((res) => {
//                 console.log(res);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     })
//     .catch(() => {});

//promise chaining
add(3, 4)
    .then((sum) => {
        console.log(sum);
        return add(sum, 4);
    })
    .then((sum2) => {
        console.log(sum2);
        return add(sum2, 4);
    })
    .then((sum3) => {
        console.log(sum3);
    })
    .catch((error) => {
        console.log(error);
    });
