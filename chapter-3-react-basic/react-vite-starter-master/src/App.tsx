// import './App.css'
import InputTodo from "./components/input.todo";

const TestComponent = () => {
  return (
    <>
      <span>text children truyền từ thằng cha xuống thằng con</span>
    </>
  );
};

function App() {
  return (
    <>
      <InputTodo age={15}>
        <TestComponent />
      </InputTodo>
    </>
  );
}

export default App;
