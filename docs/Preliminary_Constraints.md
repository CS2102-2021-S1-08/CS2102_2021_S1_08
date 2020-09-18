# Preliminary Constraints

![](Preliminary_ER_Diagram.png)

Note: png and pdf of ER diagram is in the same folder

## General Account Information

1. An account is a PCS Admin or a User 
    - Covering constraint on ISA hierarchy
2. An account must consist of username and password
3. A User is either a Pet Owner, or Care Taker, or both
    - Covering + Overlap constraint on ISA hierarchy
4. A User must contain a profile

## Pet

5. A Pet must contain a profile
6. A Pet must be owned by a Pet Owner
    - Identity dependency
    - Name as partial key
7. A Pet Owner can own multiple pets

## Care Taker Availability

8. An Availability contains a start date, an end date, the category of the pet that the care taker can take care of, and the daily price
9. Care Takers can create and advertise their Availability 
    - Identity dependency
    - Start + end date + category as partial key
10. Availabilities with the same category should not have overlapping start/end dates 
    - Cannot be reflected on ER diagram

## Bid and Order

11. A Pet Owner can bid for an Availability for their Pet
12. A Bid consists of a start date and end date that falls within that of the availability 
    - i.e. Pet owner cannot choose a date the Care Taker is unavailable for
13. A Bid is only valid if the category of the Pet matches the category of the Availability
    - Cannot be reflected on ER diagram
14. A Care Taker can only accept a single bid per availability. The bid accepted by the Care Taker is also known as a successful bid
    - Cannot be reflected on ER diagram
15. Successful bids are converted into Orders
    - Cannot be reflected on ER diagram
16. Unsuccessful bids are discarded
    - Cannot be reflected on ER diagram
17. The Availability is removed once a bid is successful. New Availabilities for days excluded by the successful bid are created
    - For instance:
      - An Availability has start date Monday and end date Friday
      - The successful Bid has start date Tuesday and end date Thursday
      - A new Availability with start and end dates Monday is created
      - A new Availability with start and end dates Friday is created
    - Cannot be reflected on ER diagram
18. An Order takes place between a Pet Owner and a Care Taker for a Pet after a successful bid 
19. An Order consists of the start date and end date as specified by the successful bid, as well as the daily price as stated in the Care Taker's Availability

## Review

20. A Pet Owner can post a review on a Care Taker based on an Order
21. A review consists of a rating from 0 to 5 stars, and the text comment

## Care Taker Working Status

22. A Care Taker is either a Full Timer, or Part Timer
    - Covering constraint on ISA hierarchy
23. A Full Timer can choose to specify which Date they wish to take a Leave on
    - Identity dependency
    - Date as partial key
24. A Full Timer cannot create an Availability on days covered by their Leave


## Care Taker Monthly Summary

25. At the start of each Month, a Monthly Summary of the previous Month is created
    - Cannot be reflected on ER diagram
26. Every Care Taker has a Monthly Summary for each Month they worked in
    - Identity dependency
    - Year and Month as partial key
27. A Monthly Summary also consists of the number of pet-days and salary of the Care Taker
28. Pet-days are calculated by checking each Order that has a start or end date belonging to that month, and then adding the number of days that belong in that month
    - Case 1: start date and end date within month
      - Add number of days from start to end
    - Case 2: start date within month, end date not within month
      - Add number of days from start date to last date of month
    - Case 3: start date not within month, end date within month
      - Add number of days from start date of month to end date
29. Salary is calculated by checking each Order that has a start or end date belonging to that month, and then adding the daily price multiplied by the number of days that belonged in that Month. The salary is also affected by whether the Care Taker is a Full Timer of Part Timer
    - Case Full Timer: Care Taker takes 85% of price
      - It does not make sense that a full timer takes a fixed rate for the first 60 pet-days. Alternative is to provide a better incentive than part timers
    - Case Part Timer: Care Taker takes 75% of price
    - Example, an Order from 30th of October to 2nd of November at a daily price of $50 will contribute $50 * 2 * 0.85 = $85 to the salary of a Full Timer for October 

## On Pricing

30. The base price of different Categories of pet should be recorded in a list, and can be modified by PCS Admin at any time
    - No way to show only PCS Admin can modify the table
31. The daily price of an Availability is determined by a variety of factors, such as the base price of the category and the average rating of the Care Taker
    - E.g. (Base Price of Category) + (Rating * 4)
    - Base Price to be obtained from the base price list
