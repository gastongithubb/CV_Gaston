// PDF Download Functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadPdfBtn');
    const cvContent = document.getElementById('cv-content');

    downloadBtn.addEventListener('click', function() {
        // Disable button during generation
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="31.416" stroke-dashoffset="31.416"><animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite"/></circle></svg><span>Generando...</span>';
        
        // Add compact mode class before generating PDF
        cvContent.classList.add('pdf-mode');
        
        // Configure PDF options for compact 2-page layout
        const options = {
            margin: [8, 8, 8, 8],
            filename: 'Gaston_Alvarez_CV.pdf',
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                letterRendering: true,
                windowWidth: 794,
                windowHeight: 1123
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before',
                after: '.page-break-after',
                avoid: ['img', '.section', '.experience-item']
            }
        };

        // Generate and download PDF
        html2pdf()
            .set(options)
            .from(cvContent)
            .save()
            .then(() => {
                // Remove compact mode class
                cvContent.classList.remove('pdf-mode');
                // Re-enable button
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15V3M12 15L8 11M12 15L16 11M2 17V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Descargar PDF</span>';
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
                // Remove compact mode class on error
                cvContent.classList.remove('pdf-mode');
                alert('Error al generar el PDF. Por favor, intenta nuevamente.');
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15V3M12 15L8 11M12 15L16 11M2 17V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Descargar PDF</span>';
            });
    });
});

