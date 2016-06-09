##############################################
### Introduction to Text Mining: Chapter 1 ###

## install packages
require(qdap)
require(tm)


### Quick Taste of Text Mining ####

# Load qdap
require(qdap)

# Print new_text to the console
new_text <- 'DataCamp is the first online learning platform that focuses on building the best 
              learning experience specifically for Data Science. We have offices in Boston and 
              Belgium and to date, we trained over 250,000 (aspiring) data scientists in over 150 
              countries. These data science enthusiasts completed more than 9 million exercises. 
              You can take free beginner courses, or subscribe for $25/month to get access to all 
              premium courses.'


# Find the 10 most frequent terms: term_count
term_count <- freq_terms(new_text, 10)

# Plot term_count
plot(term_count)


### Load Some Text ####

# Import text data
tweets <- read.csv('coffee.csv', stringsAsFactors = FALSE)

# View the structure of tweets
str(tweets)

# Print out the number of rows in tweets
nrow(tweets)

# Isolate text from tweets: coffee_tweets
coffee_tweets <- tweets$text


### Make the vector a VCorpus object ####

# Load tm
require(tm)

# Make a vector source: coffee_source
coffee_source <- VectorSource(coffee_tweets)

# Make a volatile corpus: coffee_corpus
coffee_corpus <- VCorpus(coffee_source)

# Print out coffee_corpus
coffee_corpus

# Print data on the 15th document in coffee_corpus
coffee_corpus[[15]]

# Print the text from the 15th tweet from coffee_corpus
coffee_corpus[[15]]["content"]


### Make a VCorpus from a data frame ####

# Print example_text to the console
example_text

# num                             Author1               Author2
# 1   1        Text mining is a great time. R is a great language
# 2   2     Text analysis provides insights       R has many uses
# 3   3 qdap and tm are used in text mining     DataCamp is cool!

# Create a DataframeSource on columns 2 and 3: df_source
df_source <- DataframeSource(example_text[, 2:3])

# Convert df_source to a corpus: df_corpus
df_corpus <- VCorpus(df_source)

# Examine df_corpus
df_corpus

# Create a VectorSource on column 3: vec_source
vec_source <- VectorSource(example_text[, 3])

# Convert vec_source to a corpus: vec_corpus
vec_corpus <- VCorpus(vec_source)

# Examine vec_corpus
vec_corpus


### Common Pre-processing Functions ####
# tolower()             # makes all text lowercase
# removePunctuation()   # removes punctuation
# removeNumbers()       # removes numbers
# stripWhitespace()     # remove excess spaces, tabs, etc.
# removeWords()         # stopwords
# stemDocument()        # stem common words
# stemCompletion()      # convert stemmed words to readable base term


### Common Cleaning Functions from tm ####

# Create the object: text
text <- '<b>She</b> woke up at       6 A.M. It\'s so early!  She was only 10% awake and began drinking coffee in front of her computer.'

# All lowercase
tolower(text)

# Remove punctuation
removePunctuation(text)

# Remove numbers
removeNumbers(text)

# Remove whitespace
stripWhitespace(text)


### Cleaning with qdap ####

## text is still loaded in your workspace
text <- '<b>She</b> woke up at       6 A.M. It\'s so early!  She was only 10% awake and began drinking coffee in front of her computer.'

# Remove text within brackets
bracketX(text)

# Replace numbers with words
replace_number(text)

# Replace abbreviations
replace_abbreviation(text)

# Replace contractions
replace_contraction(text)

# Replace symbols with words
replace_symbol(text)


### All about Stop Words ####

## text 
text <- '<b>She</b> woke up at       6 A.M. It\'s so early!  She was only 10% awake and began drinking coffee in front of her computer.'

# List standard English stop words
stopwords("en")

# Print text without standard stop words
removeWords(text, stopwords("en"))

# Add "coffee" and "bean" to the list: new_stops
new_stops <- c('coffee', 'bean', stopwords("en"))

# Remove stop words from text
removeWords(text, new_stops)


### Intro to word stemming and stem completion ####

# Create complicate
complicate <- c('complicated', 'complication', 'complicatedly')

# Perform word stemming: stem_doc
stem_doc <- stemDocument(complicate)

# Create the completion dictionary: comp_dict
comp_dict <- c('complicate')

# Perform stem completion: complete_text 
complete_text <- stemCompletion(stem_doc, comp_dict)

# Print complete_text
complete_text


### Word stemming and stem completion on a sentence ####

text_data <- "In a complicated haste, Tom rushed to fix a new complication, too complicatedly."
comp_dict <- c("In", "a", "complicate", "haste", "Tom", "rush", "to", "fix", "new", "too")

# Remove punctuation: rm_punc
rm_punc <- removePunctuation(text_data)

# Create character vector: n_char_vec
n_char_vec <- unlist(strsplit(rm_punc, split = ' '))

# Perform word stemming: stem_doc
stem_doc <- stemDocument(n_char_vec)

# Print stem_doc
stem_doc

# Re-complete stemmed document: complete_doc
complete_doc <- stemCompletion(stem_doc, comp_dict)

# Print complete_doc
complete_doc


### Apply Several Pre-Processing Steps to a Corpus ####

# Write a corpus cleaning function; qdap & base operations require the content_transformer wrapper
clean_corpus <- function(corpus){
  corpus <- tm_map(corpus, stripWhitespace) # removes extra spaces and tabs
  #  corpus <- tm_map(corpus, content_transformer(bracketX)) # remove text in brackets </b>BOLD</b>
  #  corpus <- tm_map(corpus, content_transformer(replace_contraction)) # replace contractions
  #  corpus <- tm_map(corpus, content_transformer(replace_abbreviation)) # replace abbreviations
  corpus <- tm_map(corpus, removePunctuation) # removes punctuation marks
  #  corpus <- tm_map(corpus, content_transformer(replace_symbol))  # replace symbols (%) with words
  #  corpus <- tm_map(corpus, content_transformer(replace_number))  # replace numbers with words
  #  corpus <- tm_map(corpus, removeNumbers) # remove numbers
  corpus <- tm_map(corpus, removeWords, c(stopwords("en"), "coffee", "mug")) # stop words
  corpus <- tm_map(corpus, content_transformer(tolower)) # convert to lowercase
  return(corpus)
}


# Apply your customized function to the tweet_corp: clean_corp
clean_corp <- clean_corpus(tweet_corp)

# Print out a cleaned up tweet
clean_corp[[227]][1]

# Print out the same tweet in original form
tweets$text[227]


### Make a Document-Term Matrix (DTM) ####

# Represents each document as a row in the matrix; words as columns
# useful if you are comparing authors within rows, or the data is arranged chronologically and you 
#    want to preserve the time series. 

# Create the dtm from the corpus: coffee_dtm
coffee_dtm <- DocumentTermMatrix(clean_corp)

# Print out coffee_dtm data
coffee_dtm

# Convert coffee_dtm to a matrix: coffee_m
coffee_m <- as.matrix(coffee_dtm)

# Print the dimensions of coffee_m
dim(coffee_m)

# Review a portion of the matrix
coffee_m[148:150, 2587:2590]


### Make a Term-Document Matrix (TDM) ####

# TDM is often the matrix used for language analysis. This is because you likely have more terms 
#    than authors or documents and life is generally easier when you have more rows than columns.

# Create a TDM from clean_corp: coffee_tdm
coffee_tdm <- TermDocumentMatrix(clean_corp)

# Print coffee_tdm data
coffee_tdm

# Convert coffee_tdm to a matrix: coffee_m
coffee_m <- as.matrix(coffee_tdm)

# Print the dimensions of the matrix
dim(coffee_m)

# Review a portion of the matrix
coffee_m[2587:2590, 148:150]