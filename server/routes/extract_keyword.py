# https://pypi.org/project/rake-nltk/

import sys

from rake_nltk import Rake


def main(input):
    r = Rake(max_length=3)

    r.extract_keywords_from_text(input)
    r.get_ranked_phrases()

    for w, s in r.rank_list[:10]:
        print(s)


if __name__ == '__main__':
    input = ""
    # min_len, max_len, total_len = sys.argv[1:3]
    for i in range(1, len(sys.argv)):
        input += sys.argv[i] + " "
    main(input.rstrip())
