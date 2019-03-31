from __future__ import print_function
from magpie import Magpie
import os

dir_path = os.path.dirname(os.path.realpath(os.getcwd()))
dir_path = os.path.join(dir_path, 'text-classification')
labels = open('thread_labels.labels', 'r').read().splitlines()
magpie = Magpie(
  keras_model='saved_data/model_main',
  word2vec_model='saved_data/word2_vec_model',
  scaler='saved_data/scaler',
  labels=labels
)

result = magpie.predict_from_file('test.txt')





