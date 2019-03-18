package arrays;

public enum Enum2 {
        SATURDAY(6,"Holiday"),
        SUNDAY(5,"Holiday"),
        MONDAY(3,"Work"),
        TUESDAY(4,"Work"),
        WEDNESDAY(5,"Work"),
        THURSDAY(6,"Work"),
        FRIDAY(7,"Work"),
    ;
    private final int dayValue;
    private final String dayType;

    // The constructor is used to
    // map the enumeration paramters to varible names which are used in main.
    Enum2(int dayValue, String dayType) {
        this.dayValue = dayValue;
        this.dayType = dayType;
    }

    public static void main(String[] args) {
        String theClassName = "enum1";
        System.out.println("+++ Start class: " + theClassName + "\n");

        System.out.printf("++ THURSDAY: %s, THURSDAY.dayType: %s, THURSDAY.dayValue: %s \n",
                THURSDAY, THURSDAY.dayType, THURSDAY.dayValue);

        System.out.println("++ List the Days:");
        for (Enum2 aDay : Enum2.values()) {
            System.out.printf("+ The Day = %s, Type = %s, Value = %d \n", aDay, aDay.dayType, aDay.dayValue);
        }
        System.out.println("+ End of list.");
        
        System.out.println("\n+++ Exit class: " + theClassName + ".");
    }
}
