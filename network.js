function network(data, labels){    
    const labelsTensor = tf.tensor1d(labels, 'int32')
    const xs = tf.tensor2d(data)    
    const ys = tf.oneHot(labelsTensor, totalCores)
    labelsTensor.dispose()

    xs.print()
    ys.print()

    const model = tf.sequential()

    const hiddenLayer = tf.layers.dense({
        units: 784,
        activation: 'sigmoid',
        inputShape: [28]
    })

    const outputLayer = tf.layers.dense({
        units: totalCores,
        activation: 'softmax'
    })

    model.add(hiddenLayer)
    model.add(outputLayer)

    model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: tf.train.sgd(0.2)
    })

    async function train(){
        for(let i = 0; i < 10; i++){
            const response = await model.fit(xs, ys, {
                epochs: 1000
            })
            console.log(response.history)
            const lastEpochIndex = response.history.loss.length - 1
            console.log(`Err rate: ${response.history.loss[lastEpochIndex]}`)
        }
    }

    train().then(() => {
        console.log('training complete!')
        const teste = tf.tensor2d([])
        model.predict(teste).print()
        teste.dispose()
    })
}

window.onload = () => {
    // network(data, labels);
}