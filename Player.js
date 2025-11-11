const Player = (name, mark) => {

    const getName = () => name;
    const getMark = () => mark;
    let points = 0;

    const addPoint = () => {
        ++points;
        return points;
    };
    
    const getPoints = () => {
        return points;
    };

    return {getName, getMark, getPoints, addPoint};

};

export default Player;