/**
 * properties to configure a terminal based project
 */
export interface TerminalProps {
    /**
     * unique code name of the program to be identified and executed from server.
     * Currently only should accept 'hangman' and 'esolang'
     */
    program: 'hangman' | 'esolang';
}
