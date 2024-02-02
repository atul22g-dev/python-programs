import calendar
from tkinter import *

# Codewithcurious.com/projects


def showCalender():
    gui = Tk()
    gui.config(background='white')
    gui.title("Calender")
    gui.geometry("550x600")
    year = int(year_field.get())
    gui_content = calendar.calendar(year)
    calYear = Label(gui, text=gui_content, font="Consolas 10 bold")
    calYear.grid(row=4, column=1, padx=20)
    gui.mainloop()


if __name__ == '__main__':
    new = Tk()
    new.config(background='saddle brown')
    new.title("Calender")
    new.geometry("500x500")

    cal = Label(new, text="Calender", bg="saddle brown",
                fg="bisque", font=("times", 28, "bold"))
    cal.grid(row=1, column=1)

    year = Label(new, text="Enter Year", bg="saddle brown",
        fg="bisque", font=("times", 20))
    year.grid(row=2, column=1)

    year_field = Entry(new, bg="bisque",)
    year_field.grid(row=3, column=1)

    button = Button(new, text="Show Calender", fg="saddle brown",
                    bg="bisque", command=showCalender)
    button.grid(row=4, column=1)

    new.mainloop()
