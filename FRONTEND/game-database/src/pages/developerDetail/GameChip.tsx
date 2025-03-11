import {Game} from "../../model/Game";
import React from "react";
import {Card, Stack} from "react-bootstrap";

interface GameChipParams {
    game: Game;
}

export const GameChip: React.FC<GameChipParams> = ({game}) => {
    return (
        <Card className='bg-info text-light shadow'>
            <Card.Body>
                <Stack direction='vertical' gap={1}>
                    <strong>{game.name}</strong>
                    {game.description ? <span>{game.description}</span> : <></>}
                </Stack>
            </Card.Body>
        </Card>
    )
}