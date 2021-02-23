Feature: Specify Number Of Events

  Scenario: When user has not specified a number, 32 is the default number
    Given user hasn’t specified a number
    When app is loaded
    Then the user should see 32 events shown by default

  Scenario: User can change the number of events they want to see
    Given user hasn’t specified a number
    When the user can change number of events
    Then the user should see event element with given number of events user choose
