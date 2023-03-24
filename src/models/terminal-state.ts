/**
 * properties to configure a terminal based project
 */
export interface TerminalState {
    /**
     * unique code name of the program to be identified and executed from server.
     * Currently only should accept 'hangman' and 'esolang'
     */
    program: string;

    input: string;

    output: string;
    
}
