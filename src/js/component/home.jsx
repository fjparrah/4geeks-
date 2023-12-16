import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Home = () => {
  const [task, setTask] = useState({ title: '', description: '', state: 'iniciado' });
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const addTask = () => {
    if (task.title.trim() !== '' && task.description.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), ...task }]);
      setTask({ title: '', description: '', state: 'iniciado' });
    }
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, state: 'finalizado' } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1 className="text-center mb-4">Todo List</h1>
          <Form className="mb-3">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={task.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="description"
                value={task.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={addTask}>
              Add Task
            </Button>
          </Form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`d-flex justify-content-between align-items-center ${
                            task.state === 'iniciado'
                              ? 'bg-warning'
                              : task.state === 'en-proceso'
                              ? 'bg-success'
                              : 'bg-primary text-white'
                          }`}
                        >
                          <div>
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                          </div>
                          <div>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteTask(task.id)}
                            >
                              X
                            </Button>
                            {task.state !== 'finalizado' && (
                              <Button
                                variant="success"
                                size="sm"
                                className="ms-2"
                                onClick={() => completeTask(task.id)}
                              >
                                Finalizar
                              </Button>
                            )}
                          </div>
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;





