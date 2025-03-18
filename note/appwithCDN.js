//when we use cdn we do not need to import react
const createElement = React.createElement('h1',{},'first React app');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(createElement);