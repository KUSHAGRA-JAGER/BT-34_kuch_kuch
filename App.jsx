import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask('');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddTask();
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    inputContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      flexGrow: 1,
      padding: '8px 10px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      padding: '8px 12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonDelete: {
      backgroundColor: '#dc3545',
    },
    buttonCancel: {
      backgroundColor: '#6c757d',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
    },
    taskText: {
      flexGrow: 1,
      cursor: 'pointer',
      fontSize: '16px',
    },
    taskDone: {
      textDecoration: 'line-through',
      color: '#888',
    },
    editInput: {
      flexGrow: 1,
      padding: '6px 8px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>To-Do List</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button style={styles.button} onClick={handleAddTask}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.listItem}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={styles.editInput}
                />
                <button style={styles.button} onClick={() => handleSaveEdit(index)}>Save</button>
                <button
                  style={{ ...styles.button, ...styles.buttonCancel }}
                  onClick={() => setEditingIndex(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTask(index)}
                  style={{
                    ...styles.taskText,
                    ...(task.done ? styles.taskDone : {}),
                  }}
                >
                  {task.text}
                </span>
                <button style={styles.button} onClick={() => handleEditTask(index)}>Edit</button>
                <button
                  style={{ ...styles.button, ...styles.buttonDelete }}
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
