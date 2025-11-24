const Player = (name, mark, isAi) => {

    const getName = () => name;
    const getMark = () => mark;
    const getIsAi = () => isAi;

    let points = 0;

    const addPoint = () => {
        ++points;
        return points;
    };
    
    const getPoints = () => {
        return points;
    };

    return {getName, getIsAi, getMark, getPoints, addPoint};

};

export default Player;