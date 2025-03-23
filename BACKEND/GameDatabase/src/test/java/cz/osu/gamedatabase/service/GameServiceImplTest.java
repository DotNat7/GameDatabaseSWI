package cz.osu.gamedatabase.service;

import cz.osu.gamedatabase.repository.DeveloperRepository;
import cz.osu.gamedatabase.repository.GameRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

class GameServiceImplTest {

    @Mock
    private GameRepository gameRepository;
    private AutoCloseable autoCloseable;
    private DeveloperRepository developerRepository;
    private GameServiceImpl underTest;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new GameServiceImpl(gameRepository, developerRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void canListGames() {
        underTest.list();
        verify(gameRepository).findAll();
    }

}