const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    // console.log(message.toLowerCase().includes('error'));
    // return <div>e</div>;
    return message.toLowerCase().includes('error') ? (
        <div className='error'>{message}</div>
    ) : (
        <div className='success'>{message}</div>
    );
};

export default Notification;
