from turtle import *
color('red', 'yellow')
begin_fill()
while True:
    forward(200)
    left(170)
    right(100)
    bk(230)
    if abs(pos()) < 10:
        break
end_fill()
done()