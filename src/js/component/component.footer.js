document.addEventListener("DOMContentLoaded", function() {
    // Função que cria o componente de navegação
    function TopNavComponent() {
        return `
                   <footer class="footer">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6">
                                <script>document.write(new Date().getFullYear())</script>2024 © FluxoLize.ia
                            </div>
                            <div class="col-md-6">
                                <div class="text-md-right footer-links d-none d-md-block">
                                    <a href="javascript: void(0);"><b>Relatar bug</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                `;
    }

    // Renderiza o componente de navegação
    function renderTopNav() {
        const footer = document.getElementById('footer');
        footer.innerHTML = TopNavComponent();
    }

    renderTopNav(); // Chama a função de renderização
});