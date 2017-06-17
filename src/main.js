import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';

module.exports = React.createClass({
    getInitialState() {
        return ({
            tasks: ['Take out the trash', 'Get groceries', 'Practice piano'],
            task: ''
        })
    },

    renderList(tasks) {
        return (
            tasks.map((task, index) => {
                return(
                    <View key={task} style={styles.task}>
                        <Text>
                            {task}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.completeTask(index)}
                        >
                            <Text>
                                &#10003;
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    },

    completeTask(index) {
        console.log('complete a task: ', this.state.tasks[index]);
        let tasks = this.state.tasks;
        tasks = tasks.slice(0, index).concat(tasks.slice(index + 1));
        this.setState({tasks});
    },

    addTask() {
        let tasks = this.state.tasks.concat([this.state.task]);
        this.setState({tasks});
    },
    
    render() {
        return (
                <View style={styles.container}>
                    <Text style={styles.header}>
                        To-Do Master
                    </Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Add a task..."
                        onChangeText={(text) => {
                            this.setState({task: text});
                            console.log(this.state.task);
                        }}
                        onEndEditing={() => this.addTask()}
                    />
                    {this.renderList(this.state.tasks)}
                </View>
        )
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        margin: 30,
        marginTop: 40,
        textAlign: 'center',
        fontSize: 18
    },
    task: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        textAlign: 'center',
        margin: 10
    }
})