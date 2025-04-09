package cz.osu.gamedatabase.service;

import cz.osu.gamedatabase.repository.DeveloperRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

class DeveloperServiceImplTest {

    @Mock
    private DeveloperRepository developerRepository;
    private AutoCloseable autoCloseable;
    private DeveloperServiceImpl underTest;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new DeveloperServiceImpl(developerRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void canListDevelopers() {
        underTest.list();
        verify(developerRepository).findAllByOrderByCreatedAsc();
    }

}