O Conventional Commits é um padrão usado para escrever commits mais descritivos e legíveis.

Esse padrão facilita a geração de Changelogs, além de facilitar a leitura.

## Estrutura

Cada mensagem possui um formato padrão:
```
tipo[area]: descrição breve
```

Temos diferentes tipos de commits:
- **feat:** Adiciona uma funcionalidade nova
- **fix:** Corrige um bug
- **docs:** Alterações na documentação
- **style:** Ajustes que não afetam a lógica do código (espaços, formatação,...)
- **refactor:** Refatoração do código (sem alterar comportamento)
- **test:** Adição ou modificação de testes
- **chore**: Tarefas que não impactam diretamente o código (exemplo, atualizar dependências)

Além disso, temos também a indicação de área afetada, por exemplo, login, ou API.

A descrição deve ser um resumo breve, de forma imperativa (Faz algo), em uma linha

### Exemplos:
```
feat[auth]: Adiciona suporte ao login com OAuth2

fix[api]: Corrige erro 500 ao criar usuário sem email

docs: Inclui instruções de instalação no readme

style: Formata arquivos usando Prettier
```
## Benefícios do Conventional Commits
1. **Clareza:** A padronização torna as mensagens de commit mais compreensíveis para qualquer membro da equipe
2. **Automatização:** Permite a geração automática de changelogs e controle de versão
3. **Histórico Limpo:** O histórico do repositório fica organizado e fácil de navegar
4. **Integração com Ferramentas:** Compatível com ferramentas como `semantic-release` para automatizar publicações baseadas em commits
## Ferramentas Relacionadas
- **Commitlint:** Valida as mensagens de commit para garantir que sigam o padrão
- **Husky:** Configura ganchos (_hooks_) de Git para verificar mensagens de commit antes de realizar um push
- **Semantic Release:** Automatiza a geração de versões e changelogs com base nos commits

Mais informações: https://www.conventionalcommits.org/en/v1.0.0/