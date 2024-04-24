import React from "react";
import TaskList from "./tasklists/Tasklists";

const Home = () => {
    const topStyle = {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center'
    }
    return(
        <div className="home">
            <div className="taskstop" style={topStyle}>
                <h4>All Tasks</h4>
            </div>

            <div className="tasklists mx-auto">
                <TaskList />
            </div>

        </div>
    );
};

export default Home;