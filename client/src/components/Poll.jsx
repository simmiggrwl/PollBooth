import React from 'react';
import {connect} from 'react-redux';
import {Pie} from 'react-chartjs-2';
import { vote, deletePoll } from '../store/actions';
import {Redirect} from 'react-router-dom';

const color = () => {
    return ('#' + Math.random().toString(16).slice(2,8));
};


const Poll = ({poll, vote, deletePoll}) => {
        const answers= poll.options && poll.options.map(option => (
        <button className="button" onClick={()=> vote(poll._id, {answer: option.option})} key={option._id}>{option.option}</button>
    ));

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
        <h3 className="poll-title">{poll.question}</h3>
        <div className="button_center">{answers}</div>
        {poll.options && <Pie data={data} />}
        <div className="button_center">
        <button className="button" onClick={deleteOnClick}>Delete Poll</button>
    </div></div>
    );
};

export default connect(store => ({
    poll: store.currentPoll
}),{ vote, deletePoll })(Poll);