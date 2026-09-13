import streamlit as st
import streamlit.components.v1 as components

# Streamlit की पेज सेटिंग
st.set_page_config(page_title="My Web App", layout="wide")

# index.html फाइल को पढ़ना और डिस्प्ले करना
with open("index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

# HTML, CSS और JS को Streamlit में दिखाना
components.html(html_code, height=800, scrolling=True)
