import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

module.exports = React.createClass({
    getInitialState() {
        return ({
            tasks: ['Take out the trash', 'Get groceries', 'Practice piano'],
            completeTasks: [],
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
        let tasks = this.state.tasks;
        tasks = tasks.slice(0, index).concat(tasks.slice(index + 1));

        let completeTasks = this.state.completeTasks;
        completeTasks = completeTasks.concat([this.state.tasks[index]]);

        this.setState({
            tasks,
            completeTasks
        });

        console.log('completeTasks: ', this.state.completeTasks);
    },

    addTask() {
        let tasks = this.state.tasks.concat([this.state.task]);
        this.setState({tasks});
    },

    renderCompleted(tasks) {
        return (
            tasks.map((task, index) => {
                return (
                    <View key={task} style={styles.task}>
                        <Text style={styles.completed}>
                            {task}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.deleteTask(index)}
                        >
                            <Text>
                                &#10005;
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    },

    deleteTask(index) {
        let completeTasks = this.state.completeTasks;
        completeTasks = completeTasks.slice(0, index).concat(completeTasks.slice(index + 1));
        this.setState({completeTasks});
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
                        }}
                        onEndEditing={() => this.addTask()}
                    />
                    <ScrollView>
                        {this.renderList(this.state.tasks)}
                        {this.renderCompleted(this.state.completeTasks)}
                    </ScrollView>
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
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        textAlign: 'center',
        margin: 10
    },
    completed: {
        color: '#555',
        textDecorationLine: 'line-through'
    }
})