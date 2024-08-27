import React from 'react';
import ApexCharts from 'react-apexcharts';
import {formatDate} from '../../utils/utils';
const formatData = (blogs) => {
  return {
    series: [{
      name: 'Post Length',
      data: blogs.map(blog => blog.title ? blog.title.length : 0)
    }],
    categories: blogs.map(blog => formatDate(blog.createdAt))
  };
}

const BlogChart = ({ blogs }) => {
  const { series, categories } = formatData(blogs);

  const options = {
    chart: {
      type: 'line'
    },
    xaxis: {
      categories
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`
      }
    }
  };

  return (
    <div className='p-6 bg-bgPrimary rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>Blogs Chart</h2>
      <ApexCharts options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default BlogChart;
