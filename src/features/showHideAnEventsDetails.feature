Feature: Show or hide an events details

  Scenario: An event element is collapsed by default
    Given list event element has been loaded
    And app loaded
    When the user hasn’t clicked details button yet
    Then the event element is collapsed by default


  Scenario: User can expand an event to see its details
    Given app is loaded
    And list of events has been loaded
    When the user clicks on details button
    Then the element should open to show details

  Scenario: User can collapse an event to hide its details
    Given app is loaded
    And event element is expanded
    When the user clicks on hide details button
    Then element should collapse, hiding details
