#############################
### Chapter 1: Matplotlib ###

### Line Plot (1)

## Generate simulated height and weight data

import numpy as np

height = np.round(np.random.normal(1.75, 0.20, 5000), 2)
weight = np.round(np.random.normal(60.32, 15, 5000), 2)
np_city = np.column_stack((height, weight))

# Import matplotlib.pyplot as plt
import matplotlib.pyplot as plt

# Make a line plot: year on the x-axis, pop on the y-axis
plt.plot(height, weight)
plt.show()

### Scatter Plot

# Change the line plot below to a scatter plot
plt.scatter(height, weight)

# Put the x-axis on a logarithmic scale
plt.xscale('log')

# Show plot
plt.show()


### Histograms

# Build histogram with 5 bins
plt.hist(height, bins = 5)

# Show and clean up plot
plt.show()
plt.clf()

# Build histogram with 20 bins
plt.hist(height, bins = 20)

# Show and clean up again
plt.show()
plt.clf()


### Customizing Plots

# Scatter plot
plt.scatter(height, weight)

# Use a third variable 'age' to dictate size of the symbols
#plt.scatter(height, weight, s = age)


# labels, title
#plt.xscale('log') 
plt.xlabel('Height [m]')
plt.ylabel('Wieght [kg]')
plt.title('Simulated Data of 5000 Height & Weight')

# Definition of tick_val and tick_lab
tick_val = [1.0,1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6]
tick_lab = ['1m', '1.2m', '1.4m', '1.6m', '1.8m', '2.0m', '2.2m', '2.4m', '2.6m']

# Adapt the ticks on the x-axis
plt.xticks(tick_val, tick_lab)

# After customizing, display the plot
plt.show()

