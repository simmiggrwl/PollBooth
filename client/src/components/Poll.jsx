import React from 'react';
import {connect} from 'react-redux';
import {Pie} from 'react-chartjs-2';
import { vote, deletePoll } from '../store/actions';


const color = () => {
    return ('#' + Math.random().toString(16).slice(2,8));
};

const Poll = ({poll, vote, deletePoll}) => {
        const answers= poll.options && poll.options.map(option => (
        <button className="button" onClick={()=> vote(poll._id, {answer: option.option})} key={option._id}>{option.option}</button>
    ));

    const options={
        radius:"50%",
    };

    const data= poll.options && {
        labels: poll.options.map(option=> option.option),
        datasets:[
            {
                label: poll.question,
                backgroundColor: poll.options.map(option => color()),
                borderColor: '#323643',
                data: poll.options.map(option => option.votes),
            },
        ],
    }; 

    const deleteOnClick = (id) => {
        deletePoll(poll._id); 
    }

    return (<div>
        <h3 className="poll-title">{poll.question} 
            <button className="button_right" onClick={deleteOnClick}>Delete Poll</button>
        </h3>
        <div className="button_center">{answers}</div>
        {poll.options && <Pie options={options} data={data}/>}
    </div>
    );
};

export default connect(store => ({
    poll: store.currentPoll
}),{ vote, deletePoll })(Poll);