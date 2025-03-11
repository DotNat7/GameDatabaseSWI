import {Game} from "../../model/Game";
import React from "react";
import {Developer} from "../../model/Developer";
import {Button, Stack} from "react-bootstrap";

interface GameChipParams {
    developer: Developer;
    deleteHandler: (id: number) => void;
}

export const DeveloperChip: React.FC<GameChipParams> = ({developer, deleteHandler}) => {
    return (
        <div className='bg-info text-light p-2 rounded-3 shadow'>
            <Stack direction='horizontal' gap={2}>
                <strong>{developer.name}</strong>
                <Button variant='danger' onClick={() => deleteHandler(developer?.id)}>X</Button>
            </Stack>
        </div>
    )
}