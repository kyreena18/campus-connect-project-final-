#!/usr/bin/env python3
"""
Campus Connect - Architecture Diagram Generator
Generates deployment and architecture diagrams using Python
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, ConnectionPatch
import numpy as np

def create_deployment_diagram():
    """Create a deployment architecture diagram"""
    fig, ax = plt.subplots(1, 1, figsize=(16, 12))
    
    # Define colors
    colors = {
        'client': '#4A90E2',
        'app': '#7ED321', 
        'backend': '#F5A623',
        'database': '#D0021B',
        'storage': '#9013FE'
    }
    
    # Client Layer
    client_boxes = [
        {'name': 'Web Browser', 'pos': (1, 9), 'size': (2, 1)},
        {'name': 'Mobile App', 'pos': (4, 9), 'size': (2, 1)},
        {'name': 'Admin Dashboard', 'pos': (7, 9), 'size': (2, 1)}
    ]
    
    for box in client_boxes:
        rect = FancyBboxPatch(
            box['pos'], box['size'][0], box['size'][1],
            boxstyle="round,pad=0.1",
            facecolor=colors['client'],
            edgecolor='black',
            alpha=0.7
        )
        ax.add_patch(rect)
        ax.text(box['pos'][0] + box['size'][0]/2, box['pos'][1] + box['size'][1]/2, 
                box['name'], ha='center', va='center', fontweight='bold', color='white')
    
    # Application Layer
    app_boxes = [
        {'name': 'Expo Router\nApplication', 'pos': (2, 7), 'size': (3, 1)},
        {'name': 'Authentication\nContext', 'pos': (6, 7), 'size': (2.5, 1)}
    ]
    
    for box in app_boxes:
        rect = FancyBboxPatch(
            box['pos'], box['size'][0], box['size'][1],
            boxstyle="round,pad=0.1",
            facecolor=colors['app'],
            edgecolor='black',
            alpha=0.7
        )
        ax.add_patch(rect)
        ax.text(box['pos'][0] + box['size'][0]/2, box['pos'][1] + box['size'][1]/2, 
                box['name'], ha='center', va='center', fontweight='bold')
    
    # Backend Layer
    backend_box = FancyBboxPatch(
        (3, 5), 4, 1,
        boxstyle="round,pad=0.1",
        facecolor=colors['backend'],
        edgecolor='black',
        alpha=0.7
    )
    ax.add_patch(backend_box)
    ax.text(5, 5.5, 'Supabase Backend', ha='center', va='center', fontweight='bold', color='white')
    
    # Database Layer
    db_boxes = [
        {'name': 'PostgreSQL\nDatabase', 'pos': (1, 3), 'size': (2.5, 1)},
        {'name': 'Supabase\nStorage', 'pos': (4, 3), 'size': (2.5, 1)},
        {'name': 'Authentication\nService', 'pos': (7, 3), 'size': (2.5, 1)}
    ]
    
    for box in db_boxes:
        rect = FancyBboxPatch(
            box['pos'], box['size'][0], box['size'][1],
            boxstyle="round,pad=0.1",
            facecolor=colors['database'],
            edgecolor='black',
            alpha=0.7
        )
        ax.add_patch(rect)
        ax.text(box['pos'][0] + box['size'][0]/2, box['pos'][1] + box['size'][1]/2, 
                box['name'], ha='center', va='center', fontweight='bold', color='white')
    
    # Storage Buckets
    storage_boxes = [
        {'name': 'Student\nDocuments', 'pos': (1, 1), 'size': (2, 1)},
        {'name': 'Placement\nOffers', 'pos': (3.5, 1), 'size': (2, 1)},
        {'name': 'Internship\nFiles', 'pos': (6, 1), 'size': (2, 1)},
        {'name': 'System\nBackups', 'pos': (8.5, 1), 'size': (2, 1)}
    ]
    
    for box in storage_boxes:
        rect = FancyBboxPatch(
            box['pos'], box['size'][0], box['size'][1],
            boxstyle="round,pad=0.1",
            facecolor=colors['storage'],
            edgecolor='black',
            alpha=0.7
        )
        ax.add_patch(rect)
        ax.text(box['pos'][0] + box['size'][0]/2, box['pos'][1] + box['size'][1]/2, 
                box['name'], ha='center', va='center', fontweight='bold', color='white')
    
    # Add connections
    connections = [
        # Client to App
        ((2, 9), (3.5, 8)),
        ((5, 9), (3.5, 8)),
        ((8, 9), (7.25, 8)),
        
        # App to Backend
        ((3.5, 7), (5, 6)),
        ((7.25, 7), (5, 6)),
        
        # Backend to Services
        ((5, 5), (2.25, 4)),
        ((5, 5), (5.25, 4)),
        ((5, 5), (8.25, 4)),
        
        # Storage connections
        ((5.25, 3), (2, 2)),
        ((5.25, 3), (4.5, 2)),
        ((5.25, 3), (7, 2)),
        ((5.25, 3), (9.5, 2))
    ]
    
    for start, end in connections:
        ax.annotate('', xy=end, xytext=start,
                   arrowprops=dict(arrowstyle='->', lw=2, color='gray'))
    
    # Add layer labels
    ax.text(0.5, 9.5, 'Client Layer', fontsize=14, fontweight='bold', rotation=90, va='center')
    ax.text(0.5, 7.5, 'Application Layer', fontsize=14, fontweight='bold', rotation=90, va='center')
    ax.text(0.5, 5.5, 'Backend Layer', fontsize=14, fontweight='bold', rotation=90, va='center')
    ax.text(0.5, 3.5, 'Services Layer', fontsize=14, fontweight='bold', rotation=90, va='center')
    ax.text(0.5, 1.5, 'Storage Layer', fontsize=14, fontweight='bold', rotation=90, va='center')
    
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 11)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Campus Connect - Deployment Architecture', fontsize=18, fontweight='bold', pad=20)
    
    plt.tight_layout()
    plt.savefig('docs/deployment-architecture.png', dpi=300, bbox_inches='tight')
    plt.show()

def create_data_flow_diagram():
    """Create a data flow diagram"""
    fig, ax = plt.subplots(1, 1, figsize=(14, 10))
    
    # Define entities
    entities = {
        'Student': {'pos': (1, 8), 'color': '#4A90E2'},
        'Admin': {'pos': (1, 6), 'color': '#F5A623'},
        'App': {'pos': (5, 7), 'color': '#7ED321'},
        'Database': {'pos': (9, 8), 'color': '#D0021B'},
        'Storage': {'pos': (9, 6), 'color': '#9013FE'},
        'Notifications': {'pos': (5, 4), 'color': '#50E3C2'}
    }
    
    # Draw entities
    for name, props in entities.items():
        circle = plt.Circle(props['pos'], 0.8, facecolor=props['color'], 
                           edgecolor='black', alpha=0.7)
        ax.add_patch(circle)
        ax.text(props['pos'][0], props['pos'][1], name, ha='center', va='center', 
                fontweight='bold', color='white' if name != 'Notifications' else 'black')
    
    # Define data flows
    flows = [
        # Student flows
        {'from': 'Student', 'to': 'App', 'label': 'Login/Register', 'curve': 0.2},
        {'from': 'App', 'to': 'Database', 'label': 'Store Profile', 'curve': 0.1},
        {'from': 'Student', 'to': 'Storage', 'label': 'Upload Docs', 'curve': 0.3, 'via': 'App'},
        
        # Admin flows
        {'from': 'Admin', 'to': 'App', 'label': 'Manage System', 'curve': -0.2},
        {'from': 'App', 'to': 'Database', 'label': 'Create Events', 'curve': -0.1},
        {'from': 'App', 'to': 'Notifications', 'label': 'Send Alerts', 'curve': 0.2},
        
        # Application flows
        {'from': 'Database', 'to': 'App', 'label': 'Fetch Data', 'curve': 0.15},
        {'from': 'Storage', 'to': 'App', 'label': 'Serve Files', 'curve': -0.15},
    ]
    
    # Draw flows (simplified for this example)
    for flow in flows:
        start_pos = entities[flow['from']]['pos']
        end_pos = entities[flow['to']]['pos']
        
        # Simple arrow for now
        ax.annotate('', xy=end_pos, xytext=start_pos,
                   arrowprops=dict(arrowstyle='->', lw=2, color='gray'))
        
        # Add label
        mid_x = (start_pos[0] + end_pos[0]) / 2
        mid_y = (start_pos[1] + end_pos[1]) / 2 + flow.get('curve', 0)
        ax.text(mid_x, mid_y, flow['label'], ha='center', va='center', 
                bbox=dict(boxstyle="round,pad=0.3", facecolor='white', alpha=0.8),
                fontsize=9)
    
    ax.set_xlim(-1, 11)
    ax.set_ylim(2, 10)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Campus Connect - Data Flow Diagram', fontsize=18, fontweight='bold', pad=20)
    
    plt.tight_layout()
    plt.savefig('docs/data-flow-diagram.png', dpi=300, bbox_inches='tight')
    plt.show()

def create_component_diagram():
    """Create a component relationship diagram"""
    fig, ax = plt.subplots(1, 1, figsize=(16, 10))
    
    # Define component groups
    components = {
        'Authentication': {
            'pos': (2, 8), 'size': (3, 1.5),
            'items': ['Login Screens', 'Auth Context', 'Route Guards']
        },
        'Student Features': {
            'pos': (6, 8), 'size': (3, 1.5),
            'items': ['Profile Mgmt', 'View Placements', 'Submit Docs']
        },
        'Admin Features': {
            'pos': (10, 8), 'size': (3, 1.5),
            'items': ['Dashboard', 'Manage Students', 'Analytics']
        },
        'Data Layer': {
            'pos': (6, 5), 'size': (3, 1.5),
            'items': ['Supabase Client', 'Database Queries', 'File Storage']
        },
        'UI Components': {
            'pos': (2, 2), 'size': (3, 1.5),
            'items': ['Forms', 'Tables', 'Charts']
        },
        'Utilities': {
            'pos': (10, 2), 'size': (3, 1.5),
            'items': ['Date Utils', 'File Utils', 'Export Utils']
        }
    }
    
    colors = ['#4A90E2', '#7ED321', '#F5A623', '#D0021B', '#9013FE', '#50E3C2']
    
    for i, (name, props) in enumerate(components.items()):
        # Draw main box
        rect = FancyBboxPatch(
            props['pos'], props['size'][0], props['size'][1],
            boxstyle="round,pad=0.1",
            facecolor=colors[i % len(colors)],
            edgecolor='black',
            alpha=0.7
        )
        ax.add_patch(rect)
        
        # Add title
        ax.text(props['pos'][0] + props['size'][0]/2, 
                props['pos'][1] + props['size'][1] - 0.2, 
                name, ha='center', va='center', fontweight='bold', 
                color='white', fontsize=12)
        
        # Add items
        for j, item in enumerate(props['items']):
            ax.text(props['pos'][0] + props['size'][0]/2, 
                    props['pos'][1] + props['size'][1] - 0.6 - (j * 0.3), 
                    f"• {item}", ha='center', va='center', 
                    color='white', fontsize=9)
    
    # Add connections
    connections = [
        ('Authentication', 'Student Features'),
        ('Authentication', 'Admin Features'),
        ('Student Features', 'Data Layer'),
        ('Admin Features', 'Data Layer'),
        ('Data Layer', 'UI Components'),
        ('Data Layer', 'Utilities')
    ]
    
    for start, end in connections:
        start_pos = components[start]['pos']
        end_pos = components[end]['pos']
        
        start_center = (start_pos[0] + components[start]['size'][0]/2, 
                       start_pos[1] + components[start]['size'][1]/2)
        end_center = (end_pos[0] + components[end]['size'][0]/2, 
                     end_pos[1] + components[end]['size'][1]/2)
        
        ax.annotate('', xy=end_center, xytext=start_center,
                   arrowprops=dict(arrowstyle='->', lw=2, color='gray'))
    
    ax.set_xlim(0, 15)
    ax.set_ylim(0, 11)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Campus Connect - Component Architecture', fontsize=18, fontweight='bold', pad=20)
    
    plt.tight_layout()
    plt.savefig('docs/component-architecture.png', dpi=300, bbox_inches='tight')
    plt.show()

if __name__ == "__main__":
    print("Generating Campus Connect Architecture Diagrams...")
    
    print("1. Creating Deployment Architecture Diagram...")
    create_deployment_diagram()
    
    print("2. Creating Data Flow Diagram...")
    create_data_flow_diagram()
    
    print("3. Creating Component Architecture Diagram...")
    create_component_diagram()
    
    print("All diagrams generated successfully!")
    print("Check the 'docs' folder for the generated PNG files.")