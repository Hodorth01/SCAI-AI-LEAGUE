// Simple JavaScript to check if it's working
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is working!');
    
    // Create a visible element to show JavaScript is working
    const div = document.createElement('div');
    div.textContent = 'JavaScript is working!';
    div.style.padding = '20px';
    div.style.backgroundColor = '#e0f7fa';
    div.style.color = '#006064';
    div.style.fontFamily = 'Arial, sans-serif';
    div.style.borderRadius = '5px';
    div.style.margin = '20px';
    div.style.textAlign = 'center';
    
    document.body.appendChild(div);
    
    // Optional: Add a button that does something when clicked
    const button = document.createElement('button');
    button.textContent = 'Click me!';
    button.style.padding = '10px 15px';
    button.style.margin = '10px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', function() {
        alert('Button clicked! JavaScript is definitely working!');
    });
    
    div.appendChild(button);
});