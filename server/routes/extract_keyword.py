# https://pypi.org/project/rake-nltk/

import sys

from rake_nltk import Rake


def main(min_len, max_len, size, input):
    r = Rake(min_length=min_len, max_length=max_len)

    r.extract_keywords_from_text(input)
    r.get_ranked_phrases()

    for w, s in r.rank_list[:size]:
        print(s)


if __name__ == '__main__':
    input = ""
    min_len, max_len, size = sys.argv[1:4]
    for i in range(4, len(sys.argv)):
        input += sys.argv[i] + " "
    main(int(min_len), int(max_len), int(size), input.rstrip())
