import Sidebar from "./Sidebar";

function Dashboard({  id  }) {
    return (
        <div style={{maxHeight:'100vh'}}>
            <Sidebar id={id}/>
        </div>
    );
}

export default Dashboard;