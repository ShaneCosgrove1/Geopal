import logging
from itertools import count
digits = 0
with open('D:/xW+B/Python/findreplace_plain.txt') as f:
	for l in f:
		l = l.rstrip()
		s = l.rsplit("\t")
		editor.replace(s[0], s[1])
		logging.warning(s)
		digits = digits + 1
logging.warning(count(digits))
logging.warning('Finito')
